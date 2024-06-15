const Product = require("../models/productModel");

const productController = {
  async index(req, res) {
    let products;
    try {
      products = await Product.find();
    } catch (error) {
      res.status(500).json({ error: "Server error", serverError: error });
    }
    res.status(200).json(products);
  },

  async store(req, res) {
    let prod;
    try {
      const { category, subCategory, name, price } = req.body;
      prod = await Product.create({ category, subCategory, name, price });
    } catch (error) {
      res.status(404).json({ error: "Server Error", serverError: error });
    }
    res.status(201).json(prod);
  },

  async update(req, res) {
    let prod;
    try {
      const { id } = req.params;
      const { category, subCategory, name, price } = req.body;
      prod = await Product.findByIdAndUpdate(
        { _id: id },
        { category, subCategory, name, price },
        { new: true }
      );
    } catch (error) {
      res.status(500).json({ error: "Sever Error", serverError: error });
    }
    res.status(200).json(prod);
  },

  // call element by id
  async fetch(req, res) {
    let call;
    try {
      const { id } = req.params;
      call = await Product.findById({ _id: id });
    } catch (error) {
      res.status(500).json({ error: "Sever Error", serverError: error });
    }
    res.status(200).json(call);
  },
  // call element by id
  // async fetch1(req, res) {
  //   let call;
  //   try {
  //     const { category } = req.body;
  //     call = await Product.find({}, {category:true,_id:false});
  //   } catch (error) {
  //     res.status(500).json({ error: "Sever Error", serverError: error });
  //   }
  //   res.status(200).json(call);
  // },

  async delete(req, res) {
    let prod;
    try {
      const { id } = req.body;
      prod = await Product.findByIdAndDelete({ _id: id });
    } catch (error) {
      res.status(500).json({ error: "Sever Error", serverError: error });
    }
    res.status(200).json(prod);
  },
};

module.exports = productController;
