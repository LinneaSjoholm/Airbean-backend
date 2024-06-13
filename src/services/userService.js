
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userDb } from '../config/db.js';


// Funktion för att registrera en ny användare
async function registerUser(req, res) {
  const { username, password } = req.body;

  try {
    // Kolla om användaren redan finns i databasen {user.db}
    const existingUser = await userDb.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };

    // Lägg till användaren i databasen {user.db}
    const newUser = await userDb.insert(user);
  
    res.status(201).json(newUser);
  } catch (error) {
   
    res.status(400).json({ error: "Failed to register user" });
  }
};

const SECRET_KEY = 'your-secret-key'; 

// Funktion för att logga in en användare
async function loginUser(req, res) {
  const { username, password } = req.body;

  // Kontrollera att användarnamn och lösenord finns
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await userDb.findOne({ username });

    // Kontrollera om användaren finns och om lösenordet stämmer
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
    // Skapa en token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });

  }
};

export { registerUser, loginUser };