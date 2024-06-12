import { adminDb } from "../config/adminDb.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = "admin-secret-key";

async function loginAdmin(req, res) {
    const { username, password } = req.body;
    const adminId = parseInt(req.params.id);

    // Hitta admin i databasen
    if(username !== adminDb.username) {
        return res.status(404).json({ message: "Admin not found" });
    }

    // Jämför lösenord
    if(password !== adminDb.password) {
        return res.status(401).json({ message: "Invalid password" });
    }

    // Skapa en token
    const token = jwt.sign({ id: adminDb.id, role: adminDb.role }, SECRET_KEY);
    res.status(200).json({ message: "Login successful", token });

};



export { loginAdmin };