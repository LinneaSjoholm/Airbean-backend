import { adminDb } from "../config/adminDb.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Hämta ADMIN_SECRET_KEY från .env-filen
dotenv.config();
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

// Funktion för att logga in en administratör
async function loginAdmin(req, res) {
    const { username, password } = req.body;
    const adminId = parseInt(req.params.id);

    // Hitta admin i databasen {adminDb - adminDb.js}
    if(username !== adminDb.username || password !== adminDb.password) {
        return res.status(404).json({ message: "Invalid username or password" });
    }

    // Skapa en token
    const token = jwt.sign({ id: adminDb.id, role: adminDb.role }, ADMIN_SECRET_KEY);
    res.status(200).json({ message: "Login successful", token });

};

export { loginAdmin };