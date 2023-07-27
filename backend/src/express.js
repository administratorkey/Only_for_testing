import express from "express";
import cors from "cors";
import { apiRootController, postEmail, validateEmail, getProtectedData, authenticateToken } from "./controllers.js";

const app = express();

app.use(cors());

app.get("/", apiRootController);
app.post("/email/", express.json(), postEmail);
app.get("/validate/:jwtToken", validateEmail);

// Endpoint protegido
app.get("/api/data", authenticateToken, getProtectedData);

export default app;
