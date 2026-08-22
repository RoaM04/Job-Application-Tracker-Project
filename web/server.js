import express from "express";
import cors from "cors";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;
const MCP_PROJECT_PATH = dirname(__dirname);

app.use(cors());
app.use(express.json());

/**
 * Create a new MCP client connected to the local MCP server.
 */
async function createMCPClient() {
  const client = new Client({
    name: "job-application-web-client",
    version: "1.0.0"
  });

  const transport = new StdioClientTransport({
    command: process.platform === "win32" ? "npx.cmd" : "npx",
    args: ["tsx", "src/index.ts"],
    cwd: MCP_PROJECT_PATH
  });

  await client.connect(transport);

  return client;
}

/**
 * Convert MCP inputSchema into the simpler structure
 * expected by the frontend.
 */
function normalizeTool(tool) {
  const schema = tool.inputSchema || {};
  const properties = schema.properties || {};
  const required = new Set(schema.required || []);

  const params = Object.entries(properties).map(([name, property]) => ({
    name,
    type:
      property.type === "number" || property.type === "integer"
        ? "number"
        : property.type === "boolean"
          ? "checkbox"
          : property.type === "string"
            ? "string"
            : "string",

    required: required.has(name),

    placeholder:
      property.description ||
      property.default?.toString() ||
      "",

    description: property.description || "",

    enum: Array.isArray(property.enum)
      ? property.enum
      : undefined
  }));

  return {
    name: tool.name,
    description: tool.description || "لا يوجد وصف",
    params
  };
}

/**
 * GET /api/tools
 *
 * Returns the actual tools exposed by the MCP server.
 */
app.get("/api/tools", async (req, res) => {
  let client;

  try {
    client = await createMCPClient();

    const result = await client.listTools();

    const normalizedTools = result.tools.map(normalizeTool);

    res.json(normalizedTools);
  } catch (error) {
    console.error("Failed to load MCP tools:", error);

    res.status(500).json({
      error: "فشل في تحميل أدوات MCP"
    });
  } finally {
    if (client) {
      try {
        await client.close();
      } catch {}
    }
  }
});

/**
 * POST /api/execute
 *
 * Executes a real MCP tool.
 */
app.post("/api/execute", async (req, res) => {
  const { tool, params = {} } = req.body;

  if (!tool || typeof tool !== "string") {
    return res.status(400).json({
      success: false,
      error: "اسم الأداة مطلوب"
    });
  }

  if (
    !params ||
    typeof params !== "object" ||
    Array.isArray(params)
  ) {
    return res.status(400).json({
      success: false,
      error: "المعطيات يجب أن تكون كائنًا صالحًا"
    });
  }

  let client;

  try {
    client = await createMCPClient();

    /**
     * Get the actual tools from MCP.
     * This prevents calling arbitrary/non-existent tool names.
     */
    const toolResult = await client.listTools();

    const selectedTool = toolResult.tools.find(
      (item) => item.name === tool
    );

    if (!selectedTool) {
      return res.status(404).json({
        success: false,
        error: "الأداة المطلوبة غير موجودة"
      });
    }

    const result = await client.callTool({
      name: selectedTool.name,
      arguments: params
    });

    res.json({
      success: !result.isError,
      data: result
    });
  } catch (error) {
    console.error(`Failed to execute MCP tool "${tool}":`, error);

    res.status(500).json({
      success: false,
      error: "حدث خطأ أثناء تنفيذ الأداة"
    });
  } finally {
    if (client) {
      try {
        await client.close();
      } catch {}
    }
  }
});

app.listen(PORT, () => {
  console.error(`Web server running on http://localhost:${PORT}`);
});