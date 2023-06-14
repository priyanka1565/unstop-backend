const SeatModel = require("../model/Seat_Data");

// Create post
const createSeat = async (req, res) => {
  try {
    // get req.body
    const {
      seat_name,
      seat_number,
      seat_row,
    } = req?.body;
    if (!req?.body)
      return res
        .status(400)
        .json({ data: "Please Enter Valid Detail To Proceed Further" });

    if (req?.body) {
      const payload = {
        seat_name: seat_name,
        seat_number: seat_number,
        seat_row: seat_row,
      };
      const Post = await SeatModel.create(payload);
      if (Post) {
        return res
          .status(200)
          .json({ message: "Seat Created Successfully", data: [] });
      } else {
        return res
          .status(200)
          .json({ message: "Unable To Create Seat", data: [] });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Retrive post by Id
const getTotalSeat = async (req, res) => {
  try {
    const Get = await SeatModel.find().lean().exec();
    if (Get) {
      return res
        .status(200)
        .json({ message: "Seat Get Successfully", data: Get });
    } else {
      return res.status(200).json({ message: "Unable To Find Seat", data: [] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const bookSeat = async (req, res) => {
  try {
    // get data
    const { seat_number } = req?.body;
    if (seat_number) {
      //  check is seat number eligible for booked seat
      var check_data = await check_status(seat_number);
      if (check_data) {
        let update_obj = {
          is_booked: 1
        }
        
        let update = await SeatModel.findOneAndUpdate({ seat_number: seat_number }, update_obj)

        const find_data = await SeatModel.find({
          is_booked: 0,
        });
      
        if (update) {
          return res.status(200).json({
            message: `Seat is booked!. with this seat Number ${seat_number} and now remaining seat is ${find_data?.length}`,
            data: []
          });
        }
      }
      else {
        return res.status(200).json({ message: "Seat is already booked!.", data: [] });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function check_status(seat_number) {
  try {
    const find_data = await SeatModel.findOne({
      seat_number: seat_number,
      is_booked: 0,
    });
    if (find_data) {
      return find_data;
    }
  } catch (err) {
    return false;
  }
}

module.exports = {
  createSeat,
  getTotalSeat,
  bookSeat,
};
