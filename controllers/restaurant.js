const Restaurant = require("../models/Restaurant");

const createRestaurant = async (req, res, next) => {
  try {
    const {
      name,
      address,
      borough,
      cuisine,
      grades,
      restaurant_id
    } = req.body;

    if (!name || !address || !borough || !cuisine || !grades || !restaurant_id) {
      res.status(400);
      return next(new Error("All restaurant fields are required"));
    }

    const restaurant = await Restaurant.create({
      name,
      address,
      borough,
      cuisine,
      grades,
      restaurant_id
    });

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getRestaurant = async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404);
      return next(new Error("Restaurant not found"));
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404);
      return next(new Error("Restaurant not found"));
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      updatedRestaurant,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404);
      return next(new Error("Restaurant not found"));
    }

    await Restaurant.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Restaurant has been deleted.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  getRestaurant,
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
