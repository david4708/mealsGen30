import User from './userModel.js';

class UserServices {
  static async findOneUser(id) {
    return await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
  }

  static async findAll() {
    return await User.findAll({
      where: {
        status: 'available',
      },
    });
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({
      status: 'disabled',
    });
  }

  static async signUp(data) {
    return await User.create(data);
  }

  static async findOneByEmail(email) {
    return await User.findOne({
      where: {
        status: 'available',
        email: email,
      },
    });
  }
}

export default UserServices;
