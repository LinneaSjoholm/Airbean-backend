
// Middleware för att validera en produkt
function validateCampaign ( req, res, next) {
    const { title, desc, price, discount } = req.body;

    // Om något av fälten saknas, returnera ett felmeddelande
    if(!title || !desc || !price || !discount) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    next();
};

export { validateCampaign };