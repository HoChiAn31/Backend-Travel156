const models = require("../models/index");
const Room = models.Room;
const roomService = require("../services/roomService");
const roomController = {
  // async createRoom(req, res) {
  //   try {
  //     const newRoom = await Room.create(req.body);
  //     res.status(201).json(newRoom);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async createRoom(req, res) {
    try {
      const roomData = {
        hotelId: req.body.hotelId,
        roomNumber: req.body.roomNumber,
        roomType: req.body.roomType,
        maxGuests: req.body.maxGuests,
        pricePerNight: req.body.pricePerNight,
        availabilitystatus: req.body.availabilitystatus,
      };

      const files = req.files; // Lấy files từ request
      const newRoom = await roomService.createRoom(roomData, files);

      res.status(201).json(newRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.findAll();
      res.status(200).json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneRoom(req, res) {
    try {
      const room = await Room.findByPk(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getRoomByHotel(req, res) {
    try {
      const room = await Room.findAll({
        where: { hotelId: req.params.hotelId },
      });
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ message: "room not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // async updateRoom(req, res) {
  //   try {
  //     const updatedRoom = await Room.update(req.body, {
  //       where: { id: req.params.id },
  //     });
  //     res.status(200).json(updatedRoom);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
  async updateRoom(req, res) {
    try {
      const roomData = {
        hotelId: req.body.hotelId,
        roomNumber: req.body.roomNumber,
        roomType: req.body.roomType,
        maxGuests: req.body.maxGuests,
        pricePerNight: req.body.pricePerNight,
        availabilitystatus: req.body.availabilitystatus,
      };

      const files = req.files; // Lấy files từ request
      const updatedRoom = await Room.update(roomData, {
        where: { id: req.params.id },
      });

      // Nếu có ảnh mới thì upload và cập nhật
      if (files && files.length > 0) {
        const imageUrls = await roomService.uploadFiles(files);
        updatedRoom.image = imageUrls[0]; // Cập nhật ảnh mới
      }

      res.status(200).json(updatedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async deleteRoom(req, res) {
    try {
      const deletedRoom = await Room.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = roomController;
