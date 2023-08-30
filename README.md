# Project Name

Library Application

## Introduction

The Library Application allows librarians and library users to login into the application. The application allows library users to search, select, and see more details about books, authors, and publishers. The Library Application also allows librarians to menage the books, authors, and publishers with full create, retrive, update and delete (CRUD) functionality. The system also does not allow users to retrive passwords or edit their user details.

## Features

- Initial screen - When the application starts, the first page shows a navbar menu with three tabs: Home page, Our Team and Log in.
- The system maintains data associated with the books, authors and publishers.
- The system allows libraians and library users to log in and out of the system.
- The system allows all users to see all three tables(Authors, Publishers and Books).
- The system allows all users to select and see more details about books, authors and publishers.
- The system allows only librarians(admins) to add, edit and delete books, authors and publishers.

## Buit With

- JavaScript
- ReactJS
- NodeJS
- Express JS
- Mongo DB


## Setup

Clone this repository. You will need `node` and `npm` installed globally on your machine.
If you want to run database locally make sure that you have `mongoDB server` installed and running in background. 
You can also run cloud database using **mongoDB Compas**. Create a clutser and paste your connection string in `dotenv` file.

## Seeding Data into Database

 To use the code effectively, follow these steps:

- Place your Excel file (LibraryData.xlsx) containing the data you want to seed in the specified path (./src/data/LibraryData.xlsx).
- Install the required packages (exceljs and sharp) using the following commands: npm install exceljs sharp .
- Include the seedData function from the provided code in your application, and call it to start seeding data. The seedData function uses the       read-excel-file package to read Excel sheets and sharp for image processing.

## Environment Variables

Create a `.env` file in the root directory of your server route. This file will contain sensitive configuration information needed for your application to function properly.

PORT: The port number on which the server will listen for incoming requests.
JWT_SECRET: A secret key used for signing and verifying JWT tokens for authentication.
MONGO: The connection URL for your MongoDB database.
SESSION_SECRET: An optional secret key used for session management.


## To get a local copy up and running, follow these simple steps:

Clone the repo git clone https://github.com/your_username/library.git
Install NPM packages npm install
Start the project npm start
