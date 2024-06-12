import { Router } from "express";
import { menu } from "../config/data.js";

const menuRouter = Router();

// "GET"/menu Visar hela menyn

menuRouter.get("/", (req, res) => {
    res.json(menu);
  });


  export default menuRouter;