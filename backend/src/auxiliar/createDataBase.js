/** @typedef {import("../defines").Email} */
import { db, Email } from "../db/models.js";

/** @type {Email[]} */
const emails = [
  { 
    address: "prueba1@dominio.es",
    disabled: false,
    verified: false
  },
  { 
    address: "prueba2@dominio.es",
    disabled: false,
    verified: true
  },
  { 
    address: "prueba3@dominio.es",
    disabled: true,
    verified: true
  }
];

async function createDatabase() {
  try {
    await db.sync();
    await Email.bulkCreate(emails);
    console.log("Base de datos creada y datos insertados correctamente.");
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
  }
}

createDatabase();
