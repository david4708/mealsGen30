import { Restaurant } from '../restaurants/restaurantModel.js';
import { Meal } from './mealModel.js';

export class mealService {
  // function to search for a meal without including the Restaurant model
  static async findOne(id) {
    return await Meal.findOne({
      where: { id, status: 'active' },
    });
  }

  // function to search for a meal including the Restaurant model
  static async findAllMeal() {
    return await Meal.findAll({
      where: {
        status: 'active',
      },
      include: {
        model: Restaurant,
      },
    });
  }
  // function to search for a meal including the Restaurant model
  static async findOneMeal(id) {
    return await Meal.findOne({
      where: { id, status: 'active' },
      include: {
        model: Restaurant,
      },
    });
  }

  static async createMeal(data) {
    return await Meal.create(data);
  }

  static async updateMeal(meal, data) {
    return await meal.update(data);
  }

  static async deleteMeal(meal) {
    return await meal.update({ status: 'inactive' });
  }
}
