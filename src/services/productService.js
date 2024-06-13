import { menuDb } from "../config/db.js";
import { menu } from "../config/data.js";

// Funktion för att lägga till en ny produkt i menyn
async function addNewProductToMenu (req, res) {

    // Hämta produktens titel, beskrivning och pris från request body
   const { title, desc, price } = req.body;

   const priceNumber = parseFloat(price);
   if (isNaN(priceNumber) || priceNumber <= 0) {
       return res.status(400).json({ error: "Price must be a positive number" });
   }

   // Kolla om produkten redan finns i menyn
   try {
    const newProduct = {
        id: menu.length > 0 ? menu[menu.length - 1].id + 1 : 1,
        title,
        desc,
        price: priceNumber,
        createdAt: new Date(),
    };

    // Lägg till produkten i menyn
    menu.push(newProduct);
    await menuDb.insert(newProduct);
    // Skicka svar till klienten
    res.status(201).json({message: 'Product added successfully' , newProduct});
   } catch (error) {
         res.status(500).json({ message: 'Error adding product to menu', error: error.message });
    };
};

// Funktion för att uppdatera en produkt i menyn
async function updateProductInMenu (req, res) {
    try {
    // Hämta produktens id från URL:en
    const { title, desc, price } = req.body;
    const productId = parseInt(req.params.id);

    let priceNumber = parseFloat(price);
    if (price && (isNaN(priceNumber) || priceNumber <= 0)) {
        return res.status(400).json({ error: "Price must be a positive number" });
    }

    // Hitta indexet för produkten i menyn
    const productIndex = menu.findIndex(item => item.id === productId);
    if(productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    // Hämta produkten från menyn
    let product = menu[productIndex];

    // Uppdatera produktens titel, beskrivning och pris om det finns i request body
    product.title = title || product.title;
    product.desc = desc || product.desc;
    product.price = price ? priceNumber : product.price;
    product.modifiedAt = new Date();

    // Uppdatera produkten i menyn
    menu[productIndex] = product;

    // Uppdatera produkten i databasen
    await menuDb.update({ _id: req.params.id }, { $set: product });
    // Skicka svar till klienten
    res.status(200).json({ message: 'Product updated successfully', product });
        } catch (error) {
        res.status(500).json({ message: 'Error updating product in menu', error: error.message });

};
};

// Funktion för att ta bort en produkt från menyn
async function deleteProductFromMenu (req, res) {
    try {
        // Hämta produktens id från URL:en
        const itemId = parseInt(req.params.id);
        
        // Sök efter produkten i den befintliga menyn i minnet { menu }
        const existingProductIndex = menu.findIndex(item => item.id === itemId);
        
        // Om produkten inte finns i minnet, returnera ett felmeddelande
        if (existingProductIndex === -1) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Ta bort produkten från den befintliga menyn i minnet
        menu.splice(existingProductIndex, 1);

        // Ta bort produkten från databasen { menuDb }
        await menuDb.remove({ _id: req.params.id });

        // Skicka svar till klienten
        res.status(200).json({ message: 'Product removed successfully', updatedMenu: menu });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from menu', error: error.message });
    };
};

export { addNewProductToMenu, updateProductInMenu, deleteProductFromMenu };
