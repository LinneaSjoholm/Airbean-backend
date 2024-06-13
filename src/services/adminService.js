import { adminDb } from "../config/adminDb.js";
import jwt from "jsonwebtoken";

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

async function loginAdmin(req, res) {
    const { username, password } = req.body;
    const adminId = parseInt(req.params.id);

    // Hitta admin i databasen
    if(username !== adminDb.username || password !== adminDb.password) {
        return res.status(404).json({ message: "Invalid username or password" });
    }

    // Skapa en token
    const token = jwt.sign({ id: adminDb.id, role: adminDb.role }, ADMIN_SECRET_KEY);
    res.status(200).json({ message: "Login successful", token });

};



export { loginAdmin };