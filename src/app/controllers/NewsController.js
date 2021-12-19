// const res = require("express/lib/response");

class NewsController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /new/:slug
    show(req, res) {
        res.send('ALOOOO!');
    }
}

module.exports = new NewsController();
