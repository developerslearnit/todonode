const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
var db = new PrismaClient();


const getTodos = async (req, res) => {
  const todo = await db.todo.findMany({});
  res.status(200).json(todo);
};

const getTodoByOwnerId = async(req,res) =>{
  const id = req.params.id
  console.log('key',id)
  if(!id){
    return res.status(400).json('Try again')
  }

  
  const todo = await db.todo.findMany({
      where: {
        ownerId: id
      }
  });

  if (!todo){
    return res.status(404).json({message:'User does not exist'})
  }
  
  res.status(200).json(todo)
}

const addTodo = async (req, res) => {
  const formattedNewDate = new Date(req.body.dueDate);
  const formattedEndDate = new Date(req.body.endDate);
  const { title, status, ownerId, categoryId } = req.body;
  const slug = slugify(title);

  const newTodo = await db.todo.create({
    data: {
      title: title,
      slug: slug.toLowerCase(),
      status: status,
      dueDate: formattedNewDate,
      endDate: formattedEndDate,
      ownerId: ownerId,
      categoryId: categoryId,
    },
  });
  res.status(200).json(newTodo);
  };

const deleteTodo = async (req, res) =>{

  const id = req.params.id

  if(!id){
    return res.status(400).json('Bad Request')
  }

const todoExist = await db.todo.findUnique({
  where: {
    id: id
  }
})
if(!todoExist){
  return res.status(404).json('Todo Not found')

}

 const todo = await db.todo.delete({
  where: {
    id: id
  }
 });
 res.status(200).json({message:"Todos deleted successfully"})
  };

 const updateTodo = async (req,res) =>{
  const id = req.params.id;
  const updatedNewDate = new Date(req.body.dueDate);
  const updatedEndDate = new Date(req.body.endDate);
  const {status,ownerId, categoryId } = req.body;


  if(!id){
    return res.status(400).json({message:"Bad Request"})
  }

const todoExist = await db.todo.findUnique({
  where: {
    id: id
  }
})
if(!todoExist){
  return res.status(404).json({message:"Todo Not Found"})

}

 const updatedTodo= await db.todo.update({
  where: {
    id: id
  },
  data: 
  {
    status: status,
    dueDate: updatedNewDate,
    endDate: updatedEndDate,
    ownerId: ownerId,
    categoryId: categoryId,
  }
 });
 res.status(200).json({message:'Updated Successfully'})
  };

module.exports = { getTodos, addTodo, getTodoByOwnerId, deleteTodo, updateTodo};
