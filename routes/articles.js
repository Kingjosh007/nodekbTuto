const express = require('express');
const router = express.Router();

// Bring in Models
let Article = require('../models/article');


// Get Single Article Route



// Add Route (to the page where we can add an article)
router.get('/add', function(req, res){
   res.render('add_article', {
    title:'Add Article',
  });
});


// Add Submit POST Route
router.post('/add', function(req, res){
    req.checkBody('title', 'Title is required').notEmpty();   // Means that the "Title" field can be empty
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    // Get errors

    let errors = req.validationErrors();
    if(errors){

       res.render('add_article', {title:'Add Article', errors:errors});

    } else {

      let article = new Article();
      article.title = req.body.title;  // We had to add Body-parser module in order to achieve that.
      article.author = req.body.author;  // We had to add Body-parser module in order to achieve that.
      article.body = req.body.body;  // We had to add Body-parser module in order to achieve that.

      article.save(function(err){
        if(err){  console.log(err);  return;}
        else {
          req.flash('success', 'Article succesfully added');
          res.redirect('/');
        }

      });
    }



})

// Load Edit Form

router.get('/edit/:id', function(req, res){  // Note the colon (kind of placeholder)
    Article.findById(req.params.id, function(err, article){
      res.render('edit_article', {
        title:'Edit Article',
        article: article
      });
    });
});

// Update Article Submit POST Route
router.post('/edit/:id', function(req, res){
    let article = {};
    article.title = req.body.title;  // We had to add Body-parser module in order to achieve that.
    article.author = req.body.author;  // We had to add Body-parser module in order to achieve that.
    article.body = req.body.body;  // We had to add Body-parser module in order to achieve that.

    let query = {_id:req.params.id};
    Article.update(query, article, function(err){
      if(err){  console.log(err);  return;}
      else {
         req.flash('success', 'Article successfully updated');
         res.redirect('/');
       }

    });

});

// Delete Article Route (Safer to use an Ajax request, I did this 'cause it didn't work with Ajax)

router.post('/delete/:id', function (req, res) {
  let query = { _id: req.params.id };
  Article.remove(query, function (error) {
    req.flash('warning', 'Article successfully deleted');
    res.send('Success in deleting article');
  });

});﻿

router.get('/:id', function(req, res){  // Note the colon (kind of placeholder)
    Article.findById(req.params.id, function(err, article){
      res.render('article', {
        article: article
      });
    });
});

// Make sure that we can access the router from outside
module.exports = router;
