const express = require('express');

const newsRoute = express.Router();

let NewsModel = require('./news.model');

// get all news
newsRoute.route('/').get(function(req, res) {
    NewsModel.find(function(err, data) {
        if(err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

//post the news
newsRoute.route("/addnews").post(function (req, res) {
    let data = new NewsModel(req.body);

    data
        .save()
        .then(X => {
            res.status(200).json({ news: "News added successfully.."});
        })
        .catch(err => {
            res.status(400).send("Unable to add news..");
        });
});

//get single news info using ref id
newsRoute.route("/getone/:id").get(function(req, res) {
    let id = req.params.id;
    NewsModel.findById({_id: id }, function(err, data) {
        res.json(data);
    });
});

//update news
newsRoute.route("/updatenews/:id").put(function(req, res) {
    let id = req.params.id;
    NewsModel.findById({_id: id }, function(err, data) {
        if (!data) {
            res.status(400).send("No data found");
        } else {
            data.title = req.body.title;
            data.image = req.body.image;
            data.content = req.body.content;
            data.reporter = req.body.reporter;
            data.reptime = req.body.reptime;

            data
                .save()
                .then(x => {
                    res.status(200).json({ news: "News updated successfully.."});
                })
                .catch(err => {
                    res.status(400).send("unable to update news..");
                });
        }
    });
});

//delete news
    newsRoute.route("/deletenews/:id").delete(function(req, res ) {
        let id = req.params;
        NewsModel.findById({_id: id }, function(err, data) {
            if (err) {
                res.status(400).send({ response: err });
            } else {
                res.status(200).send({ response: "Successfully deleted the news" });
            }
        });
    });

module.exports = newsRoute;