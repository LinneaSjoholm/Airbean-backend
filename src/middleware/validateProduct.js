

// Middleware för att validera en produkt
function validateProduct ( req, res, next) {
    const { title, desc, price } = req.body;

    // Om något av fälten saknas, returnera ett felmeddelande
    if(!title || !desc || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    next();
};

export { validateProduct };