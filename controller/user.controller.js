const { PrismaClient } = require("@prisma/client");
var db = new PrismaClient();

const getUser = async (req, res) => {
  const user = await db.user.findMany({});
  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const user = await db.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(user);
};

const addUser = async (req, res) => {
  try {
    const { userName, firstName, lastName, email, password } = req.body;

    const newUser = await db.user.create({
      data: {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await db.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
  if (!existingUser) {
    return res.status(404).json({ message: "User does not exist" });
  }
  res.status(200).json(existingUser);
};

module.exports = { getUser, addUser, getUserById, loginUser };
