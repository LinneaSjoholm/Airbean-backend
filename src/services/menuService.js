import { menuDb } from "../config/db.js";
import { menu } from "../config/data.js";

// Funktion för att lägga till en ny produkt i menyn
async function addNewProductToMenu (req, res) {

    // Hämta produktens titel, beskrivning och pris från request body
   const { title, desc, price } = req.body;
   
   // Kolla om produkten redan finns i menyn
   try {
    const newProduct = {
        id: menu.length > 0 ? menu[menu.length - 1].id + 1 : 1,
        title,
        desc,
        price,
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
    product.price = price || product.price;
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
        const productId = parseInt(req.params.id);
        const  product = await menuDb.findOne({  id: productId});
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Ta bort produkten från menyn { menuDb}
        await menuDb.remove({ _id: req.params.id });
        // Hitta indexet för produkten i menyn från { menu }
        const index = menu.findIndex(item => item.id === productId);
        // Ta bort produkten från menyn
        if(index !== -1) {
            menu.splice(index, 1);
        }
        // Skicka svar till klienten
        res.status(200).json({ message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from menu', error: error.message });
    }
};

export { addNewProductToMenu, updateProductInMenu, deleteProductFromMenu };
