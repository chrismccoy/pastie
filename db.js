const knex = require("knex")({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./db/db.sqlite",
  },
});

const createPastesTable = async () => {
  try {
    await knex.schema.createTable("pastes", (table) => {
      table.increments("id");
      table.string("language");
      table.string("uuid", 100);
      table.string("key", 100).unique();
      table.string("content", 100000).notNullable();
      table.datetime("expires_at").notNullable();
      table.timestamps(false, true);
    });
    console.log("Pastes table created successfully.");
  } catch (error) {
    console.error("Error creating pastes table:", error);
  } finally {
    await knex.destroy();
  }
};

createPastesTable();
