import database from "infra/database.js";
import { handleSmoothScroll } from "next/dist/shared/lib/router/router";
import { Query } from "pg";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW MAX_CONNECTIONS;");

  const databaseName = process.env.POSTGRES_DB;
  const connections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnections = connections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
