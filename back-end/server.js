require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurants"); // Importe les routes des restaurants
const errorHandler = require("./middlewares/error");

// Connecte-toi à la base de données
connectDB();

// Application Express
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/restaurants", restaurantRoutes); // Utilise les routes des restaurants

// Route par défaut
app.use("/", (req, res) => {
  return res.json({
    message: "Welcome to the Node.js REST API using ExpressJS and MongoDB for Restaurants"
  });
});

// Gestionnaire d'erreurs
app.use(errorHandler);

// Démarrer le serveur
const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`)
);

// Gestion des rejets de promesses non gérées
process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
