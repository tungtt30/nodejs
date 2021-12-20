const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose')


class CourseController {
   //[get] /courses/:slug
    show(req, res, next) {
        
        Course.findOne({ slut: req.params.slug }).exec()
        .then(course => {
                console.log(course.name)
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next)
    }
}

module.exports = new CourseController();
