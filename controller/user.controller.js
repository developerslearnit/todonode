const { PrismaClient } = require("@prisma/client");
var db = new PrismaClient();
const bcrypt = require("bcrypt");
const { user } = require("../routes/user.route");
const saltRounds = 10;




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


    const existingUser = await db.user.findUnique({
      where:{
        userName:userName
      }
    });

    if(existingUser){
      return res.status(400).json("A user with the same username already exists");
    }

    var encryptedPassword = "";

    const hashedPassword =  await bcrypt.hashSync(password,saltRounds);

    console.log(hashedPassword);
    const newUser = await db.user.create({
      data: {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password:hashedPassword,
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


  const user = await db.user.findFirst({
where: {
  email:email,
}
  });
  if (!user) {
    return res.status(200).json({ message: "Wrong username or password" });
  }

  const passwordMatched = await bcrypt.compareSync(password,user.password);
   if (!passwordMatched) {
    return res.status(200).json({ message: "Wrong username or password" });
  }

  res.status(200).json({data:{userId:user.id,email:user.email}});
};

module.exports = { getUser, addUser, getUserById, loginUser };
