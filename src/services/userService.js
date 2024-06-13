
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDb } from '../config/db.js';
import dotenv from 'dotenv';

// Hämtar USER_SECRET_KEY från .env-filen
dotenv.config();
const USER_SECRET_KEY = process.env.USER_SECRET_KEY;

// Funktion för att registrera en ny användare
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {

    // Kolla om användaren redan finns
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };

    // Lägg till användaren i databasen {users.db}
    const newUser = await userDb.insert(user);
  
    res.status(201).json(newUser);
  } catch (error) {
   
    res.status(400).json({ error: "Failed to register user" });
  }
}

// Funktion för att logga in en användare
async function loginUser(req, res) {
  const { username, password } = req.body;

  // Kolla om användarnamn och lösenord är ifyllda
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Kolla om användaren finns i databasen {users.db}
  try {
    const user = await userDb.findOne({ username });

  // Om användaren inte finns eller om lösenordet inte stämmer, skicka en 400-status och ett felmeddelande
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

  // Skapa en token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      USER_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });

  }
};

export { registerUser, loginUser };
