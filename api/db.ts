import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

const maxRetries = 6; // Maximum number of retries
const retryInterval = 5000; // Retry interval in milliseconds
let client;
let retries = 0;

function connect() {
  client = new pg.Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    statement_timeout: 10000,
  });

  client.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    if (retries < maxRetries) {
      ++retries;
      setTimeout(connect, retryInterval);
    }
  });

  client.connect((err) => {
    if (err) {
      console.error("Error connecting to PostgreSQL:", err);
      if (retries < maxRetries) {
        ++retries;
        setTimeout(connect, retryInterval);
      }
    } else {
      console.log("Connected to PostgreSQL");

      // Drop tables if exists
      client.query(
        "DROP TABLE IF EXISTS requests, wages, users",
        (err, result) => {
          if (err) {
            console.error("Error dropping tables:", err);
          } else {
            console.log("Drop table query executed successfully");
          }
        }
      );

      // Run the migration to recreate the tables
      client.query(schema, (err, result) => {
        if (err) {
          console.error("Error running migration:", err);
        } else {
          console.log("Migration query executed successfully");
        }
      });
    }
  });
}

connect();

export default client;
