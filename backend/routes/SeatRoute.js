const express = require("express");
const router = express.Router();

const {
  createSeat,
  getTotalSeat,
  bookSeat,
} = require("../controller/SeatController");

router.post("/create-seat", createSeat);
router.get("/get-seat", getTotalSeat);
router.post("/book-seat", bookSeat);


module.exports = router;
