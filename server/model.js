const mongoose = require('mongoose')

const feedbackSch = mongoose.Schema({
    longitude:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
        required:true
    }

},{timestamp:true})

const locationmodel = mongoose.model('locations',feedbackSch)

module.exports = locationmodel