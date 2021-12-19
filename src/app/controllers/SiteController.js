const Course = require('../models/Course');

class SiteController {
    //[GET] /Site
    index(req, res) {
        
        Course.find({}, function (err, course) {
            if(!err) { res.json(course);
                return
            }
            res.status(400).json( {error: 'error'})
        })

        // res.render('home');
    }
        
       
        
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
