// const models = require("../models/index");
// const { Op } = require("sequelize");
// const Hotel = models.Hotel;
// const RoomHotel = models.Room;
// const hotelController = {
//   async createHotel(req, res) {
//     try {
//       const newHotel = await Hotel.create(req.body);
//       res.status(201).json(newHotel);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
//   async getAllHotels(req, res) {
//     try {
//       const hotels = await Hotel.findAll();
//       res.status(200).json(hotels);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
//   async getOneHotel(req, res) {
//     try {
//       const hotel = await Hotel.findByPk(req.params.id);
//       res.status(200).json(hotel);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
//   async updateHotel(req, res) {
//     try {
//       const updatedHotel = await Hotel.update(req.body, {
//         where: { id: req.params.id },
//       });
//       res.status(200).json(updatedHotel);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
//   async deleteHotel(req, res) {
//     try {
//       const deletedHotel = await Hotel.destroy({
//         where: { id: req.params.id },
//       });
//       res.status(200).json(deletedHotel);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
//   async searchHotels(req, res) {
//     try {
//       const { keyword } = req.query;
//       const whereClause = {};
//       console.log(keyword);
//       if (keyword) {
//         whereClause[Op.or] = [
//           { name: { [Op.like]: `%${keyword}%` } },
//           { city: { [Op.like]: `%${keyword}%` } },
//         ];
//       }

//       const hotels = await Hotel.findAll({ where: whereClause });
//       res.status(200).json(hotels);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   },
//   // async searchHotels(req, res) {
//   //   try {
//   //     const { name, city, maxGuests, checkIn, checkOut } = req.query;

//   //     // Tạo điều kiện tìm kiếm dựa trên các tham số được truyền vào
//   //     const whereClause = {};

//   //     if (name) {
//   //       whereClause[Op.or] = [{ name: { [Op.like]: `%${name}%` } }];
//   //     }

//   //     if (city) {
//   //       whereClause.city = { [Op.like]: `%${city}%` };
//   //     }

//   //     // Lấy danh sách các khách sạn và các phòng của từng khách sạn
//   //     const hotels = await Hotel.findAll({
//   //       where: whereClause,
//   //       include: [
//   //         {
//   //           model: RoomHotel,
//   //           as: "roomhotels",
//   //           required: false,
//   //         },
//   //       ],
//   //     });

//   //     // Tổng hợp lại thông tin cho mỗi khách sạn
//   //     const hotelsWithSummary = hotels.map((hotel) => {
//   //       // Tính tổng số lượng phòng theo maxGuests
//   //       const maxGuestsSummary = hotel.roomhotels.reduce((summary, room) => {
//   //         const maxGuests = room.maxGuests;
//   //         summary[maxGuests] = (summary[maxGuests] || 0) + 1;
//   //         return summary;
//   //       }, {});

//   //       // Lấy danh sách các booking của từng khách sạn
//   //       const bookings = hotel.roomhotels.flatMap((room) => room.bookings);

//   //       // Tổng hợp lại availabilitystatus của các phòng dựa trên checkIn và checkOut
//   //       const availabilitySummary = hotel.roomhotels.map((room) => {
//   //         const bookedDates = room.availabilitystatus || [];

//   //         // Kiểm tra xem phòng có sẵn cho khoảng thời gian checkIn - checkOut hay không
//   //         const available = !bookedDates.some((date) =>
//   //           overlaps(date, date, checkIn, checkOut)
//   //         );

//   //         return {
//   //           roomNumber: room.roomNumber,
//   //           availability: available,
//   //         };
//   //       });

//   //       return {
//   //         ...hotel.toJSON(),
//   //         maxGuestsSummary,
//   //         availabilitySummary,
//   //       };
//   //     });

//   //     res.status(200).json(hotelsWithSummary);
//   //   } catch (error) {
//   //     console.error(error);
//   //     res.status(500).json({ message: "Internal server error" });
//   //   }
//   // },

//   async getFilterHotels(req, res) {
//     try {
//       const { city, pricepernight } = req.query;
//       const whereClause = {};

//       if (city) {
//         whereClause.city = { [Op.like]: `%${city}%` };
//       }

//       if (pricepernight) {
//         whereClause.pricepernight = { [Op.lte]: pricepernight };
//       }

//       // if (startDate) {
//       //   whereClause.startDate = { [Op.gte]: new Date(startDate) };
//       // }
//       // if (endDate) {
//       //   whereClause.endDate = { [Op.gte]: new Date(startDate) };
//       // }

//       const tours = await Hotel.findAll({ where: whereClause });
//       res.json(tours);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   },
// };
// function overlaps(start1, end1, start2, end2) {
//   return start1 < end2 && end1 > start2;
// }

// module.exports = hotelController;
// controllers/hotelController.js
// controllers/hotelController.js
const models = require("../models/index");
const { Op } = require("sequelize");
const Hotel = models.Hotel;
const Room = models.Room;
const hotelService = require("../services/hotelServices");

const hotelController = {
  async createHotel(req, res) {
    try {
      const hotelData = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        rating: req.body.rating,
        pricePerNight: req.body.pricePerNight,
        lat: req.body.lat,
        lng: req.body.lng,
      };

      // Upload images to Firebase and get URLs
      const files = req.files; // Lấy files từ request
      const newHotel = await hotelService.createHotel(hotelData, files);

      res.status(201).json(newHotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getAllHotels(req, res) {
    try {
      const hotels = await Hotel.findAll();
      res.status(200).json(hotels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // async getFilterHotels(req, res) {
  //   try {
  //     const { city, pricepernight, quantityPeople } = req.query;
  //     const whereClause = {};

  //     if (city) {
  //       whereClause.city = { [Op.like]: `%${city}%` };
  //     }

  //     if (pricepernight) {
  //       whereClause.pricepernight = { [Op.lte]: pricepernight };
  //     }

  //     const hotels = await Hotel.findAll({ where: whereClause });

  //     if (!hotels.length) {
  //       return res.json([]);
  //     }

  //     if (quantityPeople) {
  //       const availableHotels = await Promise.all(
  //         hotels.map(async (hotel) => {
  //           const rooms = await Room.findAll({ where: { hotelId: hotel.id } });
  //           const hasAvailableRoom = rooms.some(
  //             (room) => room.maxGuests >= quantityPeople
  //           );
  //           return hasAvailableRoom ? hotel.toJSON() : null;
  //         })
  //       );
  //       const result = availableHotels.filter((hotel) => hotel !== null);
  //       return res.json(result);
  //     }

  //     res.json(hotels);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },

  async getFilterHotels(req, res) {
    try {
      const { city, pricepernight, quantityPeople } = req.query;
      const whereClause = {};

      if (city) {
        whereClause.city = { [Op.like]: `%${city}%` };
      }

      if (pricepernight) {
        whereClause.pricepernight = { [Op.lte]: pricepernight };
      }

      const hotels = await Hotel.findAll({ where: whereClause });

      if (!hotels.length) {
        return res.json([]);
      }

      if (quantityPeople) {
        const availableHotels = await Promise.all(
          hotels.map(async (hotel) => {
            const rooms = await Room.findAll({ where: { hotelId: hotel.id } });

            const totalAvailableBeds = rooms.reduce((acc, room) => {
              return acc + room.maxGuests; // Tính tổng số giường trống
            }, 0);

            // Kiểm tra điều kiện số người lớn hơn 6
            const hasAvailableRoom =
              quantityPeople > 6
                ? totalAvailableBeds >= quantityPeople // Kiểm tra nếu tổng giường trống >= quantityPeople
                : totalAvailableBeds > 0; // Nếu nhỏ hơn hoặc bằng 6, chỉ cần có ít nhất 1 giường trống

            return hasAvailableRoom ? hotel.toJSON() : null;
          })
        );

        const result = availableHotels.filter((hotel) => hotel !== null);
        return res.json(result);
      }

      res.json(hotels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // async getFilterHotels(req, res) {
  //   try {
  //     const { city, pricepernight, quantityPeople } = req.query;
  //     const whereClause = {};

  //     if (city) {
  //       whereClause.city = { [Op.like]: `%${city}%` };
  //     }

  //     if (pricepernight) {
  //       whereClause.pricepernight = { [Op.lte]: pricepernight };
  //     }

  //     // Tìm các khách sạn phù hợp
  //     const hotels = await Hotel.findAll({ where: whereClause });

  //     // Nếu không có khách sạn nào phù hợp
  //     if (!hotels.length) {
  //       return res.json([]);
  //     }

  //     // Nếu có quantityPeople, lọc các phòng phù hợp
  //     if (quantityPeople) {
  //       const availableHotels = await Promise.all(
  //         hotels.map(async (hotel) => {
  //           const rooms = await Room.findAll({ where: { hotelId: hotel.id } });
  //           const filteredRooms = rooms.filter(
  //             (room) => room.maxGuests >= quantityPeople
  //           );
  //           return { ...hotel.toJSON(), rooms: filteredRooms };
  //         })
  //       );

  //       // Lọc những khách sạn có phòng phù hợp
  //       const result = availableHotels.filter(
  //         (hotel) => hotel.rooms.length > 0
  //       );
  //       return res.json(result);
  //     }

  //     // Nếu không có quantityPeople, trả về tất cả khách sạn phù hợp
  //     res.json(hotels);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  async getOneHotel(req, res) {
    try {
      const hotel = await Hotel.findByPk(req.params.id);
      res.status(200).json(hotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateHotel(req, res) {
    try {
      const hotelData = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        rating: req.body.rating,
        pricePerNight: req.body.pricePerNight,
        lat: req.body.lat,
        lng: req.body.lng,
      };

      const files = req.files; // Lấy files từ request
      const updatedHotel = await Hotel.update(hotelData, {
        where: { id: req.params.id },
      });

      // Upload new images if provided
      if (files && files.length > 0) {
        const imageUrls = await hotelService.uploadFiles(files);
        updatedHotel.images = imageUrls; // Cập nhật ảnh mới
      }

      res.status(200).json(updatedHotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteHotel(req, res) {
    try {
      const deletedHotel = await Hotel.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(deletedHotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async searchHotels(req, res) {
    try {
      const { keyword } = req.query;
      const whereClause = {};
      if (keyword) {
        whereClause[Op.or] = [
          { name: { [Op.like]: `%${keyword}%` } },
          { city: { [Op.like]: `%${keyword}%` } },
        ];
      }

      const hotels = await Hotel.findAll({ where: whereClause });
      res.status(200).json(hotels);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = hotelController;
