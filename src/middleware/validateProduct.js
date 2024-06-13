

// Middleware för att validera en produkt
function validateProduct ( req, res, next) {
    const { title, desc, price } = req.body;

    // Om något av fälten saknas, returnera ett felmeddelande
    if(!title || !desc || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Om price inte är ett positivt nummer, returnera ett felmeddelande
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
        return res.status(400).json({ error: "Price must be a positive number" });
    }
    // Spara det validerade priset i req.body
    req.body.price = priceNumber;
    // Om valideringen lyckas, gå vidare till nästa middleware eller route handler
    next();
};

export { validateProduct };