const Category = require("../models/categoryModel");

const categoryController = {
  async index(req, res) {
    let categories;
    try {
      categories = await Category.find().sort({ title: 1 });
    } catch (error) {
      res.status(500).json({ error: "Server error", serverError: error });
    }
    res.status(200).json(categories);
  },
  async view(req, res) {
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
      const { title, price } = req.body;
      const thumbnail =req.files["thumbnail"] || [];
      const thumbnail1 =req.files["thumbnail1"] || [];

      console.log(req.body);
      cat = await Category.create({
        title,
        price,
        thumbnail: "upload/category/thumbnail/" + thumbnail[0].filename,
        thumbnail1: "upload/category/thumbnail/" + thumbnail1.filename,
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
  async fetch(req, res) {
    let call;
    try {
      const { id } = req.params;
      call = await Category.findById({ _id: id });
    } catch (error) {
      res.status(500).json({ error: "Sever Error", serverError: error });
    }
    res.status(200).json(call);
  },
  async search(req, res) {
    let products;
    try {
      const { search } = req.query;
      products = await Category.find({
        title: { $regex: search, $options: "i" },
      });
    } catch (error) {
      res.status(500).json({ error: "Server error", serverError: error });
    }
    res.status(200).json({ status: 200, Category: products });
  },

  async filterquery (req,res){
    try{
      let category=[];
      const{search,minPrice,maxPrice} =req.query;
      console.log(search+minPrice+maxPrice)
      let filter ={};
      if(search){
        filter.title = {$regex:search,$options:"i"}; // i use on case sensetive
      }
      if(minPrice){
        filter.price = {...filter.price,$gte:minPrice};
      }
      if(maxPrice){
        filter.price={...filter.price,$lte:maxPrice}
      }
      console.log(filter)
      category = await Category.find(filter);
      res.json({status:200,Category:category});
    }
    catch (error) {
      console.log(error);
      return res.json({status:500,error:"Server error"})
    }
     
  }
};

module.exports = categoryController;
