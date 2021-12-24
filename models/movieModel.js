const mongoose  = require('mongoose')
// =============================================

const movieSchema = new mongoose.Schema({
    title:{type:String},
    status:{type:String, default:'analyzing'},
    image_url:{type:String},
    cloudinary_id:{type:String},
},{
    collection:'Movies'
})

module.exports = mongoose.model('Movies', movieSchema)