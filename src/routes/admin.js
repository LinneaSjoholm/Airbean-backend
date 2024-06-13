import { Router } from 'express';
import { loginAdmin } from '../services/adminService.js';
import { addNewProductToMenu, updateProductInMenu, deleteProductFromMenu } from "../services/menuService.js";
import { validateProduct } from "../middleware/validateProduct.js";
import { authenticateAdminToken } from '../middleware/adminAuth.js';

const adminRouter = Router();

// POST /admin/login för att logga in en admin
adminRouter.post("/login", loginAdmin);

// "POST"/admin Lägger till en ny produkt i menyn
adminRouter.post("/products", authenticateAdminToken, validateProduct, addNewProductToMenu);

// "PUT"/admin Uppdaterar en produkt i menyn
adminRouter.put("/products/:id", authenticateAdminToken, validateProduct, updateProductInMenu);

// "DELETE"/admin/:id Tar bort en produkt från menyn
adminRouter.delete("/products/:id", authenticateAdminToken, deleteProductFromMenu);

// "POST" /admin/logout för att logga ut en admin
adminRouter.post("/logout", (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
});

export default adminRouter;