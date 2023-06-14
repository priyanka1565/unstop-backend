const User = require("../model/UserModel");

//create a user

const createUser = async (req, res) => {
  const { name, email, bio } = req.body;
  try {
    const newUser = new User({ name, email, bio });
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

//passing the id in params and get the user

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// pass ID in paramsand name and bio from body
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  try {
    const user = await User.findById(id);
    if (user) {
      // if name and bio not found then we updated from previous by using || operator
      user.name = name || user.name;
      user.bio = bio || user.bio;
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user by id

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(201).json({ message: "User deleted" });
      
    } else {
      res.status(404).json({ message: "User not found" });
    }

    
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }

}



module.exports = {
  createUser,
  getUserById,
  deleteUser,
  updateUserById,
};
  