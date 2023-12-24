const express = require("express");
const {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants
} = require("../controllers/restaurant");

const router = express.Router();

// Créer un restaurant
router.post("/", createRestaurant);

// Obtenir tous les restaurants
router.get("/", getRestaurants);

// Obtenir un restaurant spécifique
router.get("/:id", getRestaurant);

// Mettre à jour un restaurant
router.put("/:id", updateRestaurant);

// Supprimer un restaurant
router.delete("/:id", deleteRestaurant);

module.exports = router;
