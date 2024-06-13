
// Middleware för att validera en produkt
function validateCampaign ( req, res, next) {
    const { title, desc, discount } = req.body;

    // Om något av fälten saknas, returnera ett felmeddelande
    if(!title || !desc || !discount) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    // Om discount inte är ett positivt nummer, returnera ett felmeddelande
    const discountNumber = parseFloat(discount);
    if (isNaN(discountNumber) || discountNumber <= 0) {
        return res.status(400).json({ error: "Discount must be a positive number" });
    }

    req.body.discount = discountNumber; 
    next();
};

export { validateCampaign };