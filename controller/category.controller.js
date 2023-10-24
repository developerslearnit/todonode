const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
var db = new PrismaClient();

const getCategories = async (req, res) => {
  const category = await db.category.findMany({});
  res.status(200).json(category);
};

const addCategory = async (req, res) => {
  const { title } = req.body;
  const slug = (slugify(title));

  const newCategory = await db.category.create({
    data: {
      title: title,
      slug: slug.toLowerCase(),
    },
  });
  res.status(200).json(newCategory);
};



module.exports = { getCategories, addCategory };