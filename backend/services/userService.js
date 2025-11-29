const User = require("../models/User");

const userService = {
  getUserProfile: async (userId) => {
    const user = await User.findById(userId).select('-password -__v');
    
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },

  updateUserProfile: async (userId, updateData) => {
    const allowedUpdates = ['name', 'phone'];
    const updates = {};
    
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
};

module.exports = userService;