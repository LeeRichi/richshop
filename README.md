Lastest update at Oct.18 :dizzy:
1. Frontend updates
New frontend layouts that filter and sort the products using Redux toolkit.<br>
User-friendly dashboard for admin user to manage the entities.<br>
Here is a test account.<br>
email: admin@gmail.com, password: 123<br>
visit: https://richshop.netlify.app/

:speech_balloon:	
The backend is currently being optimized. Stay tuned!

# Links
backend: https://richshop.azurewebsites.net/swagger/index.html<br>
frontend: https://richshop.netlify.app/

# Accounts for testing
Admin user(with authroity to Crud users, products and orders):
Email: admin@gmail.com password: 123

Normal user(with basic user functions):
Email: user@gmail.com   password: 123

# Fullstack Project
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.15-drakblue)
![elephantSQL](https://img.shields.io/badge/elephantSQL-v-green)
![mui-material](https://img.shields.io/badge/mui-v.5-green)
![neon](https://img.shields.io/badge/neon-v-green)

## Key Concepts
This project involves creating a Fullstack project with React and Redux on the frontend and ASP.NET Core 7 on the backend. The goal is to provide a seamless experience for users, along with robust management system for administrators.

## Tech Stack
- Frontend: SASS, TypeScript, React, Redux Toolkit
- Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

## Features


#### User Functionalities
1. User Management: Users should be able to register for an account and log in. Users cannot register themselves as admin.[done]
2. Browse Products: Users should be able to view all available products and single product, search and sort products.[done]
3. Add to Cart: Users should be able to add products to a shopping cart, and manage cart.[done]
4. Checkout: Users should be able to place order.[done]

#### Admin Functionalities
1. User Management: Admins should be able to view and delete users.[done]
2. Product Management: Admins should be able to view, edit, delete and add new products.[done]
3. Order Management: Admins should be able to view all orders [done]

### Extra features
## User Functionalities:
1. Order Management: Users should be able to view their order history, track the status of their orders, and potentially cancel orders within a certain timeframe.

## Admin Functionalities
1. User Management: Admins should be able to edit users' role and create new users.
2. Order Management: Admins should be able to update order status, view order details, handle returns/refunds, and cancel orders.

## Getting Started
Maunully:
Backend: in folder /backend/WebApi, run dotnet watch.
It will start server running and we can access api endpoint http://localhost:5052/api/v1/<br>
Visualizable detail in http://localhost:5052/swagger/index.html.

Frontend: in folder /frontend, run npm start
It will start server running on http://localhost:3000
Or visit the Links that I deployed, view [ here](#links)
