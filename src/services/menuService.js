import { menuDb } from "../config/db.js";
import { menu } from "../config/data.js";

async function addNewProductToMenu (req, res) {
   const { title, desc, price } = req.body;
   
   try {
    const newProduct = {
        id: menu.length > 0 ? menu[menu.length - 1].id + 1 : 1,
        title,
        desc,
        price,
        createdAt: new Date(),
    };

    menu.push(newProduct);
    await menuDb.insert(newProduct);
    res.status(201).json({message: 'Product added successfully' , newProduct});

   } catch (error) {
         res.status(500).json({ message: 'Error adding product to menu', error: error.message });
    };
};

async function updateProductInMenu (req, res) {
    try {
    const { title, desc, price } = req.body;
    const productId = parseInt(req.params.id);

    const productIndex = menu.findIndex(item => item.id === productId);
    if(productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    let product = menu[productIndex];

    product.title = title || product.title;
    product.desc = desc || product.desc;
    product.price = price || product.price;
    product.modifiedAt = new Date();

    menu[productIndex] = product;

    await menuDb.update({ _id: req.params.id }, { $set: product });

    res.status(200).json({ message: 'Product updated successfully', product });
    
        } catch (error) {
        res.status(500).json({ message: 'Error updating product in menu', error: error.message });

};
};



async function deleteProductFromMenu (req, res) {
   
    try {
        const productId = parseInt(req.params.id);
        const  product = await menuDb.findOne({  id: productId});
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await menuDb.remove({ _id: req.params.id });

        const index = menu.findIndex(item => item.id === req.params.id);
        if(index !== -1) {
            menu.splice(index, 1);
        }

        res.status(200).json({ message: 'Product removed successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error removing product from menu', error: error.message });
    }
};

export { addNewProductToMenu, updateProductInMenu, deleteProductFromMenu };
