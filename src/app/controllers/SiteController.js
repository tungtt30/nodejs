const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET] /Site

    home(req, res, next) {
        res.render('home');
    }
    mp3(req, res, next) {
        res.render('mp3');
    }
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
