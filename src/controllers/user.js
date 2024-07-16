const models = require("../models/index");
const User = models.User;
const userService = require("../services/userService");
const userController = {
  // async createUser(req, res) {
  //   try {
  //     const newUser = await User.create(req.body);
  //     res.status(201).json(newUser);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async createUser(req, res) {
    try {
      const userData = {
        password: req.body.password,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        fullName: req.body.fullName,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        address: req.body.address,
      };

      const file = req.file; // Lấy file từ request
      const newUser = await userService.createUser(userData, file);

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getUserByEmail(req, res) {
    try {
      const user = await User.findOne({
        where: { email: req.params.email },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // async updateUserByEmail(req, res) {
  //   try {
  //     const { email } = req.params;
  //     const updateData = req.body; // Assuming the fields to update are sent in the request body

  //     const [updated] = await User.update(updateData, {
  //       where: { email: email },
  //     });

  //     if (updated) {
  //       const updatedUser = await User.findOne({ where: { email: email } });
  //       res.status(200).json(updatedUser);
  //     } else {
  //       res.status(404).json({ message: "User not found" });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async updateUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const updateData = req.body;
      const file = req.file;

      if (file) {
        const imageUrl = await userService.uploadFile(file);
        updateData.image = imageUrl;
      }

      const [updated] = await User.update(updateData, {
        where: { email },
      });

      if (updated === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await User.findOne({ where: { email } });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const file = req.file;
      let imageUrl = null;

      if (file) {
        imageUrl = await userService.uploadFile(file);
      }

      const [updated] = await User.update(
        {
          ...updateData,
          ...(imageUrl && { image: imageUrl }),
        },
        {
          where: { id },
        }
      );

      if (updated === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = await User.findByPk(id);
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = userController;
