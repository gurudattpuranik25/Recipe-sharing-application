
# Flavor - A recipe sharing application

Flavor is a modern and user-friendly recipe sharing application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This platform allows users to discover, share, and contribute their favorite recipes effortlessly. With a sleek and intuitive interface, Flavor provides a seamless experience for both cooking enthusiasts and those looking for culinary inspiration. Users can create accounts, post their own recipes, explore a diverse range of dishes, and engage with a vibrant community of fellow food lovers. Elevate your cooking journey with Flavor - where the joy of sharing meets the pleasure of cooking.




## Tech Stack

MongoDB, Express JS, React, and Node JS (MERN)


## Features

- User authentication & authorization
- Create, edit, and delete recipes
- Add and delete comments on other's recipes



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGODB_USERNAME`

`MONGODB_PASSWORD`

`CLOUDINARY_APIKEY`

`CLOUDINARY_APISECRET`

`JWT_SECRETKEY`


## API Reference

#### Registration

```http
  POST http://localhost:3000/auth/users/register
```

#### Login

```http
  POST http://localhost:3000/auth/users/login
```
#### Get user by ID

```http
  GET http://localhost:3000/auth/users/getUser/:userID
```

#### Logout

```http
  POST http://localhost:3000/auth/users/logout
```

#### Get all recipes

```http
  GET http://localhost:3000/recipe/recipes
```

#### Get selected recipe by ID

```http
  GET http://localhost:3000/recipe/getSelectedRecipe/:recipeID
```
#### Create recipe

```http
  POST http://localhost:3000/recipe/createRecipe
```
#### Update recipe

```http
  PATCH http://localhost:3000/recipe/updateRecipe/:recipeID
```
#### Delete recipe

```http
  DELETE http://localhost:3000/recipe/deleteRecipe/:recipeID
```
#### Add comment

```http
  POST http://localhost:3000/recipe/addComment/:recipeID
```
#### Delete comment

```http
  POST http://localhost:3000/recipe/deleteComment/:recipeID
```



## Run Locally

Clone the project

```bash
  git clone https://github.com/gurudattpuranik25/Recipe-sharing-application.git
```

To start the server

```bash
  cd backend (from root directory)
```

```bash
  npm install
```

```bash
  node index.js
```

To start the client

```bash
  cd frontend (from root directory)
```

```bash
  npm install
```

```bash
  npm run dev
```


## Feedback

If you have any feedback, please reach out to me at guruhp999@gmail.com

