const { PrismaClient } = require('@prisma/client');
var db = new PrismaClient();

const getUser = async (req, res) => {
  const user = await db.user.findMany({});
  res.status(200).json(user);
};


const getUserById = async(req,res) =>{
  const todo = await db.user.findUnique({
      where: {
        id: req.params.id
      }
   
  });
  res.status(200).json(user)
}

const addUser = async (req, res) => {
const {userId ,email , firstName ,lastName } = req.body;
 
const newUser = await db.user.create({
    data: {
      userId: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
  });
  res.status(200).json(newUser);
};



module.exports = { getUser, addUser, getUserById };