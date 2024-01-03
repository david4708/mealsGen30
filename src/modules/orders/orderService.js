import { Meal } from '../meals/mealModel.js';
import { Restaurant } from '../restaurants/restaurantModel.js';
import { Order } from './orderModel.js';

export class OrderService {
  static async findOneOrder(id) {
    return await Order.findOne({
      where: { id: id, status: 'active' },
      include: {
        model: Meal,
        attributes: ['name', 'price'],
        include: { model: Restaurant, attributes: ['name'] },
      },
    });
  }

  static async findAllOrderSessionUser(sessionUser) {
    return await Order.findAll({
      where: {
        status: 'active',
        userId: sessionUser,
      },
      include: {
        model: Meal,
        attributes: ['name', 'price'],
        include: { model: Restaurant, attributes: ['name'] },
      },
    });
  }

  static async findAllOrders() {
    return await Order.findAll({
      where: { status: 'active' },
      include: {
        model: Meal,
        attributes: ['name', 'price'],
        include: { model: Restaurant, attributes: ['name'] },
      },
    });
  }

  static async createOrder(data) {
    return await Order.create(data);
  }

  static async updateOrder(order) {
    return await order.update({ status: 'completed' });
  }

  static async deleteOrder(order) {
    return await order.update({ status: 'cancelled' });
  }
}
