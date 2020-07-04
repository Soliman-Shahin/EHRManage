const mongoose = require('mongoose');

let db = mongoose.connect('mongodb+srv://Soliman:Soliman94@cluster0.1sqwk.mongodb.net/EHRManage?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, function(err) {

    if (err) {
        console.log(err)
    } else {
        console.log('connected to db successfully...')
    }
});