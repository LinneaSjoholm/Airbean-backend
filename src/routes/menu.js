import { Router } from "express";
import { menu } from "../config/data.js";
import { addNewProductToMenu, updateProductInMenu, deleteProductFromMenu } from "../services/menuService.js";

const menuRouter = Router();

// "GET"/menu Visar hela menyn

menuRouter.get("/", (req, res) => {
    res.json(menu);
  });

// "POST"/menu Lägger till en ny produkt i menyn

menuRouter.post("/", addNewProductToMenu);

// "PUT"/menu/:id Uppdaterar en produkt i menyn

menuRouter.put("/:id", updateProductInMenu);

// "DELETE"/menu/:id Tar bort en produkt från menyn

menuRouter.delete("/:id", deleteProductFromMenu);

  export default menuRouter;