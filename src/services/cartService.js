import { cartDb } from '../config/db.js';
import { menu } from '../config/data.js';

// Funktion för att lägga till i kundvagnen
async function addToCart(req, res) {
  const { title, price } = req.body; 

  // Hitta produkten i menyn {menu - data.js}
  const product = menu.find(item => item.title === title);

  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }
  if (product.price !== price) {
    return res.status(400).json({ error: 'Invalid price' });
  }

  // Skapa ett orderobjekt
  const order = { title, price, preptime: product.preptime };

  // Försök att lägga till ordern i databasen {cart.db}
  try {
    const newOrder = await cartDb.insert(order);

  // Skicka en 201-status och ett svar med orderns information
    const response = {
      title: newOrder.title,
      price: newOrder.price,
      preptime: newOrder.preptime,
      message: 'Added to cart successfully',
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add to cart' });
  }
}

// Funktion för att visa kundvagnen
async function viewCart(req, res) {
  try {
    // Försök att hämta alla ordrar från databasen {cart.db}
    const cart = await cartDb.find({});

    // Räkna ut totalpriset för alla ordrar
    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

    res.status(200).json({ cart, totalPrice });
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve cart' });
  }
}

// Funktion för att ta bort från kundvagnen
async function removeFromCart(req, res) {

  // Försök att hitta ordern i databasen {cart.db}
  try {
    const order = await cartDb.findOne({ _id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Försök att ta bort ordern från databasen {cart.db}
    await cartDb.remove({ _id: req.params.id });

    res.status(200).json({ message: 'Order removed successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'An error occurred', error: error.message });
  }
};

export { addToCart, viewCart, removeFromCart };
