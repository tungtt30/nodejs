const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connect to database success');
    } catch (error) {
        console.log('connect to database failure');
    }
}

module.exports = { connect };
