import express from 'express';
import menuRouter from './src/routes/menu.js';
import aboutRouter from './src/routes/companyInfo.js';
import orderRouter from './src/routes/order.js';
import userRouter from './src/routes/users.js';
import cartRouter from './src/routes/cart.js';
import adminRouter from './src/routes/admin.js';

import dotenv from 'dotenv';
// Laddar in .env-filen med hjälp av dotenv och lägger in variablerna i process.env objektet { secret_keys }
dotenv.config();

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.use('/admin', adminRouter);
app.use('/menu', menuRouter);
app.use('/about', aboutRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
