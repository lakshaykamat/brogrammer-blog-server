const BlogModel = require("../models/BlogModel.js");
const CategoryModel = require("../models/CategoryModel.js");
const { tryCatch } = require("../utils/tryCatch.js");
const { marked } = require("marked");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const DOMPurify = createDOMPurify(new JSDOM().window);

const asyncHandler = require("express-async-handler");

const getAllBlogs = tryCatch(
  asyncHandler(async (req, res) => {
    const blogs = await BlogModel.find();
    res.json(blogs);
  })
);

const CreateBlog = tryCatch(
  asyncHandler(async (req, res) => {
    const { title, image, description, body, category } = req.body;

    //Check this category exists or not
    const existingCategory = await CategoryModel.findOne({ name: category });

    //if category not exits then create a new one
    if (!existingCategory) {
      await CategoryModel.create({ name: category, blogCount: 1 });

      // if category exists then increase blogCount by 1
    } else {
      existingCategory.blogCount += 1;
      await existingCategory.save();
    }

    //Convert Markdown to HTML and create blogPost
    const blog = await BlogModel.create({
      title,
      image,
      description,
      body: DOMPurify.sanitize(marked(body)),
      category,
    });
    res.status(201).json(blog);
  })
);

const editBlog = tryCatch(
  asyncHandler(async (req, res) => {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      throw new Error("Blog not found");
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBlog);
  })
);

const getBlog = tryCatch(
  asyncHandler(async (req, res) => {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("blog not found");
    }
    res.status(200).json(blog);
  })
);

const deleteBlog = tryCatch(
  asyncHandler(async (req, res) => {
    const blog = await BlogModel.findById({ _id: req.params.id });
    if (!blog) {
      res.status(404);
      throw new Error("blog not found");
    }

    //if blog found then delete  it
    await BlogModel.findByIdAndDelete({ _id: req.params.id });

    //GET the blog category you deleted
    const category = await CategoryModel.findOne({ name: blog.category });

    //if category exits and reduce the blogCount to -1
    if (category) {
      category.blogCount = category.blogCount - 1;
      //if blogCount is 0 it's means there is no blog for this category so also delete the category
      if (category.blogCount === 0) {
        await CategoryModel.findByIdAndDelete({ _id: category._id });
        return res.status(200).json({ blog, category });
      }
      await category.save();
    }

    res.status(200).json({ blog, category });
  })
);

const deleteAllBlog = tryCatch(
  asyncHandler(async (req, res) => {
    await CategoryModel.deleteMany();
    await BlogModel.deleteMany();
    res.status(200).json({ message: "Deleted" });
  })
);

module.exports = {
  getAllBlogs,
  CreateBlog,
  deleteBlog,
  editBlog,
  getBlog,
  deleteAllBlog,
};
