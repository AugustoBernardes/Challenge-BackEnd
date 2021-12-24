
const undefinedRoute = (req,res) => {
    res.status(400)
    res.send({
        code:"UNDEFINED_ROUTE",
        message:"This route don't exist!"
    })
}

module.exports = undefinedRoute