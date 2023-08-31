# Links
backend: https://fullstackshop.azurewebsites.net/swagger/index.html<br>
frontend: https://richshop.netlify.app/

# Fullstack Project
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

## Key Concepts
This project involves creating a Fullstack project with React and Redux on the frontend and ASP.NET Core 7 on the backend. The goal is to provide a seamless experience for users, along with robust management system for administrators.

31.8 Update:
Redux will be implemented befroe 10.9.

## Tech Stack
- Frontend: SASS, TypeScript, React, Redux Toolkit
- Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

## Table of Contents
1. [Features](#features)
   - [Mandatory features](#mandatory-features)
   - [Extra features](#extra-features)
2. [Getting Started](#getting-started)


## Features

### Mandatory features

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
Backend: in folder /backend/WebApi, run dotnet watch.
It will start server running and we can access api endpoint http://localhost:5052/api/v1/
Detail in http://localhost:5052/swagger/index.html .

Frontend: in folder /frontend, run npm start
It will start server running on http://localhost:3000

## ERD diagram
<img width="986" alt="Screen Shot 2023-08-31 at 9 20 37 AM" src="https://github.com/LeeRichi/full_stack_project/assets/86901868/ae39c64c-9085-467f-a73a-e511edbfba7e">


## Backend design
![backend_design](https://github.com/LeeRichi/fs15_Fullstack/assets/86901868/23648c54-68c3-4ddc-9f91-fc4a5bcfee23)

