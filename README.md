# backend-project-grupp-6

# Airbean API


## The assignment:

"In this group project, you will create an API for the web app Airbean where users can order coffee and have it delivered by drone (drones are not included in the assignment). Note: You do not need to create any frontend; your task is only the backend."

## Start up the project:

1. In the terminal, write git clone INSERT THE LINK TO THE GITHUB REPOSITORY HERE

2. Ensure you have Node.js installed, then write npm install in the terminal

3. In the terminal write npm run dev to start the development server.

4. To test out the application, make sure you have Insomnia or Postman installed on your computer.

# API documentation

## Base URL:
http://localhost:8000

## Endpoints:

### 1. Menu
URL: /menu
- Method: GET
- Description: This endpoint returns the entire menu.


### 2. About
URL: /about
- Method: GET
- Description: This endpoint returns information about the company.

### 3. User Registration and Authentication
URL: /user/register
- Method: POST
- Description: This endpoint allows a new user to register.
- Example Request:
  ```json
  {
    "username": "newuser",
    "password": "password123"
  }

URL: /user/login
- Method: POST
- Description: This endpoint allows a user to log in.

URL: /user/logout
- Method: POST
- Description: This endpoint allows a user to log out.

### 4. Cart Management
URL: /cart
- Method: POST
- Description: this endpoint allow a user to add an item to their cart.

URL: /cart
- Method: GET
- Description: this endpoint returns the current contents of the cart along with the total price.

URL: /cart/:id
- Method: DELETE
- Description: This endpoint allows a user to remove an item from their cart by specifying the item's ID in the URL.

### 5. Order Management
URL: /order/guest
- Method: POST
- Description: This endpoint allows guests to create a new order.

URL: /order
- Method: POST
- Header: Authorization: Bearer <token>
- Description: This endpoint allows authenticated users to create a new order.

URL: /order/user/:userId
- Method: GET
- Description: This endpoint shows a list of all your orders, and the total sum.

URL: /order/:orderId
- Method: GET
- Description: This endpoint shows the status of a specific order.

### 6. Admin Authentication
URL: /admin/login
- Method: POST
- Description: This endpoint allows admin to log in.

URL: /admin/logout
- Method: POST
- Description: This endpoint allows admin to log out.

### 7. Admin Product Management
URL: /admin/products
- Method: POST
- Header: Authorization: Bearer <token>
- Description: This endpoint allows admin to add new product to menu.

URL: /admin/products/:id
- Method: PUT
- Header: Authorization: Bearer <token>
- Description: This endpoint allows admin to modify a product on the menu.

URL: /admin/products/:id
- Method: DELETE
- Header: Authorization: Bearer <token>
- Description: This endpoint allows admin to remove a product from menu.

### 8. Admin Campaign Management
URL: /admin/campaign
- Method: POST
- Header: Authorization: Bearer <token>
- Description: This endpoint enables administrators to add a campaign offer.



### Security
All endpoints that require authentication use JWT (JSON Web Token) to secure the API

. Send the JWT token in the Authorization header with each request that requires authentication.


### Contributors:
Linnea Sjöholm
Patrik Eriksson
Lina Persson Signell
Jens Alm
Victoria Sten Åsenius


#### License:
"ISC"
