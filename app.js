const express = require('express')
const app = express()
const PORT = 9999
const path =require('path')
//const time_date = require(__dirname+'/read')
app.use(express.static(path.join(__dirname,'./')));

app.get("/html", (req, res) => {
    res.sendfile(__dirname + "/date.html")
})
app.get("/Map/:a/:b/:c", (req, res) => {
    //res.sendfile(__dirname + `/Map03.html/${req.params.a}/${req.params.b}/${req.params.c}`)
    res.sendfile(__dirname + `/Map03.html`)
    
})


app.listen(PORT, function (req, res) {
    console.log(`Application is running on ${PORT}`)
})