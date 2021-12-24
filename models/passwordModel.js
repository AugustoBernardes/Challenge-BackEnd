const mongoose  = require('mongoose')
// =============================================

const passwordSchema = new mongoose.Schema({
    password:{type:String}
},{
    collection:'Password'
})

module.exports = mongoose.model('Password', passwordSchema)