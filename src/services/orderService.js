import { cartDb, orderDb } from '../config/db.js';

// Funktion för att skapa en order som gäst
async function createguestOrder(req, res) {
  try {
    // Hämta alla ordrar från databasen {cart.db}
    const cart = await cartDb.find({});
    if (cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Räkna ut totalpriset för ordern
    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

    // Skapa en order-tid
    const orderTime = new Date();
    // Hitta den längsta förberedelsetiden
    const maxPreparationTime = Math.max(...cart.map(order => order.preptime));

    // Räkna ut leveranstiden
    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );

    // Skapa en order
    const order = {
      items: cart,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
    };

    // Försök att lägga till ordern i databasen {order.db}
    await orderDb.insert(order);

    // Ta bort alla ordrar från databasen {cart.db}
    await cartDb.remove({}, { multi: true });

    // Skicka en 201-status och ett svar med orderns information
    res.status(201).json({
      items: order.items,
      totalPrice: order.totalPrice,
      delivery: order.deliveryTime,
      message: 'Order created successfully',
      orderId: order._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create order', error: error.message });
  }
}

// Funktion för att skapa en order som inloggad användare
async function createOrder(req, res) {
  try {
    // Hämta alla ordrar från databasen {cart.db}
    const cart = await cartDb.find({});
    if (cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalPrice = cart.reduce((total, order) => total + order.price, 0);

    const orderTime = new Date();
    const maxPreparationTime = Math.max(...cart.map(order => order.preptime));

    const deliveryTime = new Date(
      orderTime.getTime() + maxPreparationTime * 60000
    );

    const user = req.user;
    const order = {
      items: cart,
      totalPrice,
      deliveryTime,
      createdAt: new Date(),
      userId: user.id, // Inkluderar userId om användaren är inloggad
    };

    const newOrder = await orderDb.insert(order);

    await cartDb.remove({}, { multi: true });

    res.status(201).json({

      items: newOrder.items,
      totalPrice: newOrder.totalPrice,
      delivery: newOrder.deliveryTime,
      message: 'Order created successfully',
      orderId: newOrder._id, // Inkluderar orderId om användaren är inloggad

    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create order', error: error.message });
  }
}


// Funktion för att hämta en användares orderhistorik
async function getUserOrders(req, res) {
  try {
    // Hämta userId från URL-parametern
    const userId = req.params.userId;
  
    // Hämta alla ordrar från databasen som matchar userId
    const usersOrder = await orderDb.find({ userId: userId });

    // Om ingen order hittas, skicka en 404-status
    if (usersOrder.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }

    res.status(200).json({ orderCount: usersOrder.length, orders: usersOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users orders' });
  }
};

export { createOrder, getUserOrders, createguestOrder };

