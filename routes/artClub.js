const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()
const multer = require("multer");
const path = require("path");

const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken")

const {Jwt_secret} = require("../keys");

const CLUBNEWS = mongoose.model("CLUBNEWS");
const LEGACY = mongoose.model("LEGACY");


// -> CLUB NEWS - ART CLUB 
// POST: API FOR CLUB NEWS
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

// GET: API FOR CLUB NEWS
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



// -> LEGACY 
// POST: API FOR LEGACY
router.post('/legacy', async (req, res) => {
  try {
    const { name, years, image, biography, contributions, influence } = req.body;
    const newLegend = new LEGACY({
      name,
      years,
      image,
      biography,
      contributions,
      influence
    });
    const saved = await newLegend.save();
    return res.status(201).json({
      success: true,
      message: 'Legend entry created successfully!',
      data: saved,
    });
  } catch (error) {
    console.error('Error creating legend entry:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// GET: API FOR LEGACY
router.get('/legacygetall', async (req, res) => {
  try {
    const legends = await LEGACY.find().sort({ name: 1 }); // Alphabetical order
    res.status(200).json({
      success: true,
      count: legends.length,
      data: legends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch legends',
      error: error.message
    }); 
  }
});

// -> HALL OF FAME
// POST: API FOR HALLOFFAME
const HALLOFFAME = mongoose.model("HALLOFFAME");

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


// GET: API FOR HALL OF FAME
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



// -> IMAGE GALLERY
// POST: API FOR IMAGE GALLERY

const GALLERY = mongoose.model("GALLERY");

router.post('/gallerypost', async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ error: "Title and imageUrl are required!" });
    }

    const newImage = new GALLERY({ title, imageUrl });
    await newImage.save();

    res.status(201).json({ message: "Image added successfully!", data: newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  GET: API FOR IMAGE GALLERY
router.get('/viewgallerypost', async (req, res) => {
  try {
    const images = await  GALLERY.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// -> CLUB CONTEST

const upload = require('../middleWares/upload');
const CONTEST = require('../model/artClub/contest');

router.post('/contest', upload.single('file'), async (req, res) => {
  try {
    const { contest, title, description } = req.body;
    const file = req.file;

    if (!contest || !title || !description || !file) {
      return res.status(400).json({ success: false, message: 'All fields including file are required.' });
    }

    const newSubmission = new CONTEST({
      contest,
      title,
      description,
      imageUrl: `/middleWares/upload/${file.filename}`,
      fileType: file.mimetype,
      fileSizeKB: Math.ceil(file.size / 1024)
    });

    await newSubmission.save();
    res.status(201).json({ success: true, message: 'Submission successful!', data: newSubmission });
  } catch (error) {
    console.error('POST /contest error:', error);
    res.status(500).json({ success: false, message: 'Server error while submitting entry.' });
  }
});

router.get('/contest', async (req, res) => {
  try {
    const entries = await CONTEST.find().sort({ submittedAt: -1 });
    res.status(200).json({ success: true, data: entries });
  } catch (error) {
    console.error('GET /contest error:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching entries.' });
  }
});


module.exports = router;