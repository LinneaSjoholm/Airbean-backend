
// Middleware för att validera en produkt
function validateProduct ( req, res, next) {
    const { title, desc, price } = req.body;

    // Om något av fälten saknas, returnera ett felmeddelande
    if(!title || !desc || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // Om titel eller beskrivning inte är en sträng eller om de är tomma, returnera ett felmeddelande
    if(typeof title !== "string" || typeof desc !== "string" || title.trim() === "" || desc.trim() === "") {
        return res.status(400).json({ error: "Title and description must be strings" });
    }
    // Om priset inte är ett nummer, returnera ett felmeddelande
    if(isNaN(price) || !Number.isFinite(parseFloat(price))) {
        return res.status(400).json({ error: "Price must be a number" });
    }
    // Om priset är mindre än eller lika med 0, returnera ett felmeddelande
    if(parseFloat(price) <= 0) {
        return res.status(400).json({ error: "Price must be greater than 0" });
    }
    // Om valideringen lyckas, gå vidare till nästa middleware eller route handler
    next();
};

export { validateProduct };