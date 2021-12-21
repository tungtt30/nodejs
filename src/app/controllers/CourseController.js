const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[get] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slut: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[get]
    create(req, res, next) {
        res.render('courses/create');
    }
    //[post]
    store(req, res, next) {
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }
}

module.exports = new CourseController();
