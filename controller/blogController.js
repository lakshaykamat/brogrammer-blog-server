const BlogModel = require("../models/BlogModel.js");
const { tryCatch } = require("../utils/tryCatch.js");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel.js");
const auth = require("../middleware/verifyToken.js")

const getAllBlogs = tryCatch(
  asyncHandler(async (req, res) => {

    const { slug, category } = req.query

    if (slug || category) {
      if (slug) {
        const blogs = await BlogModel.findOne({ slug });
        res.json(blogs)
      } else {
        const blogs = await BlogModel.find({ category });
        res.json(blogs);
      }
    } else if (slug && category) {
      const blogs = await BlogModel.findOne({ slug, category });
      res.json(blogs);
    } else {
      const blogs = await BlogModel.find();
      res.json(blogs);
    }

  })
);
const getAllCategory = tryCatch(
  asyncHandler(async (req, res) => {
    const data = await BlogModel.find();
    const categories = [...new Set(data.map(item => item.category))];
    res.json(categories);
  }
  ))
const CreateBlog = tryCatch(asyncHandler(async (req, res) => {
  const { title, image, description, body, category, slug, publishedAt, author } = req.body;

  const _slug = await BlogModel.find({ slug })
  if (_slug.length > 0) {
    res.status(400).send({message:"Slug already exists"})
  } else {
    //Convert Markdown to HTML and create blogPost
    const blog = await BlogModel.create({
      title,
      image,
      description,
      body,
      slug,
      author,
      publishedAt,
      category,
    });

    res.status(201).json(blog);
  }

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
    if (!req.params.id) {
      res.status(400);
      throw new Error("id is required");
    }
    const blog = await BlogModel.findById({ _id: req.params.id });
    if (!blog) {
      res.status(404);
      throw new Error("blog not found");
    }

    //if blog found then delete  it
    await BlogModel.findByIdAndDelete({ _id: req.params.id });


    res.status(200).json({ blog });
  })
);

const deleteAllBlog = tryCatch(
  asyncHandler(async (req, res) => {
    const a = await CategoryModel.deleteMany();
    const b = await BlogModel.deleteMany();
    const c = await UserModel.deleteMany();
    res.status(200).json({ category: a, blogs: b, user: c });
  })
);

module.exports = {
  getAllBlogs,
  CreateBlog,
  deleteBlog,
  editBlog,
  getBlog,
  deleteAllBlog,
  getAllCategory
};
