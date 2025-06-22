const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()

const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")

const {Jwt_secret} = require("../keys");

const CLUBNEWS = mongoose.model("CLUBNEWS");

// POST /api/news — Create news
router.post('/clubnews', async (req, res) => {
  try {
    const newsData = req.body;

    const newNews = new CLUBNEWS(newsData);
    await newNews.save();

    res.status(201).json({
      success: true,
      message: "News posted successfully!",
      data: newNews,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to post news",
      error: err.message,
    });
  }
});


router.get('/clubnewsviewallpost', async (req, res) => {
  try {
    const allNews = await CLUBNEWS.find().sort({ publishedAt: -1 }); // Latest first
    res.status(200).json({
      success: true,
      count: allNews.length,
      data: allNews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
      error: error.message
    }); 
  }
});









// Post Api For Hall Of Fame
const HALLOFFAME = mongoose.model("HALLOFFAME");

// POST new HallOfFame entry
router.post('/halloffame', async (req, res) => {
  try {
    const { title, category, origin, imageUrl, description, period, tags } = req.body;

    // Create new document
    const newEntry = new HALLOFFAME({
      title,
      category,
      origin,
      imageUrl,
      description,
      period,
      tags,
    });

    const saved = await newEntry.save();
    return res.status(201).json({
      success: true,
      message: 'Hall of Fame entry created successfully!',
      data: saved,
    });
  } catch (error) {
    console.error('Error creating Hall of Fame entry:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});


// Get Api of Hall Of Fame
router.get('/halloffamegetallpost', async (req, res) => {
  try {
    const hallOfFame = await HALLOFFAME.find().sort({ publishedAt: -1 }); // Latest first
    res.status(200).json({
      success: true,
      count: hallOfFame.length,
      data: hallOfFame
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news',
      error: error.message
    }); 
  }
});


module.exports = router;