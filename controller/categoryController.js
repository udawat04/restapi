const Category = require("../models/categoryModel");

const categoryController = {
  async index(req, res) {
    let categories;
    try {
      categories = await Category.find();
    } catch (error) {
      res.status(500).json({ error: "Server error", serverError: error });
    }
    res.status(200).json(categories);
  },

  async store(req, res) {
    let cat;
    try {
      const { title, description, thumbnail } = req.body;
      console.log(req.body);
      cat = await Category.create({
        title,
        description,
        thumbnail: "upload/category/thumbnail/" + req.file.filename,
      });
    } catch (error) {
      res.status(500).json({ error: "Server Error.", serverError: error });
    }
    res.status(201).json(cat);
  },
  async delete(req, res) {
    let prod;
    try {
      const { id } = req.params;
      prod = await Category.findByIdAndDelete({ _id: id });
    } catch (error) {
      res.status(500).json({ error: "Sever Error", serverError: error });
    }
    res.status(200).json(prod);
  },
};

module.exports = categoryController;
