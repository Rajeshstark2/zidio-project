const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// Create a new blog
router.post('/', auth, async (req, res) => {
  try {
    console.log('Blog creation request body:', req.body); // Debug log
    const { title, content, tags, imageUrl } = req.body;
    const blog = new Blog({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      author: req.user._id,
      imageUrl
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog' });
  }
});

// Get a single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.user', 'name');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Error fetching blog' });
  }
});

// Add a comment to a blog
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    blog.comments.push({
      user: req.user._id,
      content
    });
    
    await blog.save();
    
    const updatedBlog = await Blog.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.user', 'name');
    
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// Get user's blogs
router.get('/user/:userId', async (req, res) => {
  try {
    console.log('Fetching blogs for user:', req.params.userId);
    
    const blogs = await Blog.find({ author: req.params.userId })
      .populate('author', 'name')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });
    
    console.log('Found blogs:', blogs);
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    res.status(500).json({ message: 'Error fetching user blogs' });
  }
});

// Delete a blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Only allow the author to delete
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }
    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

module.exports = router; 