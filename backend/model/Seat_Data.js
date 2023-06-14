const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    seat_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    seat_number: {
      type: Number,
      required: true,
    },
    seat_row: {
      type: Number,
      required: true,
    },
    is_booked: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
