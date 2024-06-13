
// Middleware för att validera när man lägger till nåt i kunvagnen
function validateCart(req, res, next) {

  // Destrukturera title och price från req.body
  const { title, price } = req.body;

  // Kontrollera om title eller price saknas
  if (!title || !price) {

    // Om någon av dem saknas, skicka en 400-status och ett felmeddelande
    return res.status(400).json({ error: "Title and price are required" });
  }
  
  next();
}

export { validateCart };
