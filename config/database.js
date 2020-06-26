const mongoose = require('mongoose');

let db = mongoose.connect('mongodb://localhost:27017/EHRManage', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function(err) {

    if (err) {
        console.log(err)
    } else {
        console.log('connected to db succcesfuly...')
    }
});