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
GET http://localhost:8000/menu
- Description: This endpoint returns the entire menu.

### 2. About
GET http://localhost:8000/about
- Description: This endpoint returns information about the company.

### 3. User Registration and Authentication
POST http://localhost:8000/user/register
- Description: This endpoint allows a new user to register.
- Example Response 400 Bad Request:
  ```json
  {
    "error": "Username already exists"
  }

POST http://localhost:8000/user/login
- Description: This endpoint allows a user to log in.
- Example of an already existing user to put in body:
  ```json
  {
    "username": "TestUser1",
    "password": "12345"
  }

POST http://localhost:8000/user/logout
- Description: This endpoint allows a user to log out.

### 4. Cart Management
POST http://localhost:8000/cart
- Description: this endpoint allow a user to add an item to their cart.
- Example Request in body:
  ```json
	{
		"title": "Latte Macchiato",
		"price": 49
	}

GET http://localhost:8000/cart
- Description: this endpoint returns the current contents of the cart along with the total price.
- Example Response:
  ```json
  {
	"cart": [
		{
			"title": "Caffè Doppio",
			"price": 49,
			"preptime": 7,
			"_id": "KB5FaNAjQhzxvHPs" // This is :id
		}
	],
	"totalPrice": 49
  }


DELETE http://localhost:8000/cart/:id
- Description: This endpoint allows a user to remove an item from their cart by specifying the item's ID in the URL.

### 5. Order Management
POST http://localhost:8000/order/guest
- Description: This endpoint allows guests to create a new order.

POST http://localhost:8000/order
- Header: Authorization: Bearer (token)
- Description: This endpoint allows authenticated users to create a new order.

GET http://localhost:8000/order/user/:userId
- Description: This endpoint shows a list of all your orders, and the total sum.
- Example to show TestUser1's list of orders:
  ```json
	{
		(http://localhost:8000/order/user/sQTbJAkwIjruQ25S)
	}

- Example Response:
  ```json
  {
   "orderCount": 1,
    "orders": [
	      {
		"items": [
		{
		  "title": "Caffè Doppio",
		  "price": 49,
		  "preptime": 7,
		  "_id": "cwO52IbeYWOGy6oh"
		}
		],
		  "totalPrice": 49,
		  "deliveryTime": "2024-06-13T16:06:15.693Z",
		  "createdAt": "2024-06-13T15:59:15.693Z",
		  "userId": "sQTbJAkwIjruQ25S",
	          "_id": "poFMf9bISn3d5O3Z"  // This is the :orderId
		}
	       ]
  }
  
GET http://localhost:8000/order/:orderId
- Description: This endpoint shows the status of a specific order.

### 6. Admin Authentication
POST http://localhost:8000/admin/login
- Description: This endpoint allows admin to log in.

POST http://localhost:8000/admin/logout
- Description: This endpoint allows admin to log out.

### 7. Admin Product Management
POST http://localhost:8000/admin/products
- Header: Authorization: Bearer (token)
- Description: This endpoint allows admin to add new product to menu.
- Example Request in body:
  ```json
	{
	"title" : "Matcha Latte",
	"desc" : "Sött, lent grönt te",
	"price" : "59"
  }

- Example Response:
  ```json
  {
	"message": "Product added successfully",
	"newProduct": {
		"id": 7,
		"title": "Matcha Latte",
		"desc": "Sött, lent grönt te",
		"price": 59,
		"createdAt": "2024-06-13T13:23:57.210Z"
	}
   }

PUT http://localhost:8000/admin/products/:id
- Header: Authorization: Bearer (token)
- Description: This endpoint allows admin to modify a product on the menu.
- Example Request in body:
  ```json
  {
		"title": "Cortado",
		"desc": "Bryggd på månadens bönor.",
		"price": 49
  }

- Example Response:
  ```json
  {
	"message": "Product updated successfully",
	"product": {
		"id": 6,
		"title": "Cortado",
		"desc": "Bryggd på månadens bönor.",
		"price": 49,
		"preptime": 5,
		"modifiedAt": "2024-06-13T18:28:38.410Z"
	}
  }

- Example with incorrect token, 401 Unauthorized:
  ```json
  {
	"error": "Access denied. Only administrators can perform this action."
  }

DELETE http://localhost:8000/admin/products/:id
- Header: Authorization: Bearer (token)
- Description: This endpoint allows admin to remove a product from menu.

### 8. Admin Campaign Management
POST http://localhost:8000/admin/campaign
- Header: Authorization: Bearer (token)
- Description: This endpoint enables administrators to add a campaign offer.
- Example Response, 400 Bad Request:
  ```json
  {
	"error": "All fields are required"
  }
- Example Request in body:
  ```json
  {
	"title": "Cortado",
	"desc" : "Njut av en god Cortado med en bit Budapest för endast 50 kr",
	"discount" : "50%"
  }

- Example Response:
  ```json
  {
	"message": "Campaign added successfully",
	"title": "Cortado",
	"desc": "Njut av en god Cortado med en bit Budapest för endast 50 kr",
	"discount": "50%"
}


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
