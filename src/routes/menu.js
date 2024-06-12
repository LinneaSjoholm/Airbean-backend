import { Router } from "express";
import { menu } from "../config/data.js";
import { addNewProductToMenu, updateProductInMenu, deleteProductFromMenu } from "../services/menuService.js";
import { validateProduct } from "../middleware/validateProduct.js";

const menuRouter = Router();

// "GET"/menu Visar hela menyn

menuRouter.get("/", (req, res) => {
    res.json(menu);
  });

// "POST"/menu Lägger till en ny produkt i menyn

menuRouter.post("/products", validateProduct, addNewProductToMenu);

// "PUT"/menu/:id Uppdaterar en produkt i menyn

menuRouter.put("/products/:id", validateProduct, updateProductInMenu);

// "DELETE"/menu/:id Tar bort en produkt från menyn

menuRouter.delete("/products/:id", deleteProductFromMenu);

  export default menuRouter;