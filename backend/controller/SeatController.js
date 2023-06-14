const SeatModel = require("../model/Seat_Data");

// Create post
const createSeat = async (req, res) => {
  try {
    // get req.body
    const {
      seat_name,
      seat_number,
      row_number,
      start_of_current_row,
      end_of_current_row,
      total_seat,
      current_row_book_count,
    } = req?.body;
    if (!req?.body)
      return res
        .status(400)
        .json({ data: "Please Enter Valid Detail To Proceed Further" });

    if (req?.body) {
      const obj = {
        seat_number: seat_number,
        row_number: row_number,
        start_of_current_row: start_of_current_row,
        end_of_current_row: end_of_current_row,
        current_row_book_count: current_row_book_count,
      };
      const payload = {
        seat_name: seat_name,
        seat_number: seat_number,
        total_seat: total_seat,
        seat_map: JSON.stringify(obj),
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
      //console.log(check_data, "check_data");
      if (check_data) {
        let seat_data = JSON.parse(check_data.seat_map);
        //console.log(seat_data, "seat")
        if (seat_data.seat_number == seat_number && seat_data.current_row_book_count <= seat_data.end_of_current_row)
        {
          let total_seat = check_data.total_seat;
          let count = total_seat - 1;
          let row_available_seat = seat_data.current_row_book_count - 1;
          console.log(row_available_seat, "row_available_seat");
          let total_available_seat = count;
          console.log(total_available_seat, "total_available_seat");
         
          return res.status(200).json({
            message: `seat is confirm with this seat number ${seat_number}`,
            data: {
              row_available_seat: row_available_seat,
              total_available_seat: total_available_seat,
            },
          });

          // console.log(update_obj,"update")
        } else {
          return res
            .status(200)
            .json({ message: "Seat is Not available in this row", data: [] });
        }
      }
    }

    return res.json({ data: check_data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function check_status(seat_number) {
  try {
    const find_data = await SeatModel.findOne({
      seat_number: seat_number,
      is_booked: false,
      is_available: false,
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
