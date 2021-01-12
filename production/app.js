const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const http = require("http");
const axios = require("axios");
const { response } = require("express");
const app = express()
app.use(jsonParser)
const server = http.createServer(app);


app.use(express.static(__dirname + "/public/"));
app.use(express.static(__dirname + "public"))
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

app.use(expressLayouts)
app.set('layout', 'layout')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

app.use('/contact', require("./routes/contact.js"))
app.get('/', (req, res) => {
    res.render('Home', { title: 'Home Page'  })
})
let projects=
        [
            {name : "chatpage" , link:"https://gist.github.com/Amadeus-Stephen/920a143dbd299e2412ce7eaddcea28c4.json"},
            {name : "javacontroller", link:"https://gist.github.com/Amadeus-Stephen/19480d4a8d9d25737f7e982e98feb5ef.json"},
            {name : "tictactoe" , link:"https://gist.github.com/Amadeus-Stephen/92ebf19402ace302f98a8054b810e67a.json"},
            {name : "snek" ,link: "https://gist.github.com/Amadeus-Stephen/939dd849d635e0894503664b1f95d8f0.json"},
            {name : "socket" , link:"https://gist.github.com/Amadeus-Stephen/c086381f91c74036c9d563c6b7065226.json"},
            {name : "passport" , link:"https://gist.github.com/Amadeus-Stephen/5c7cc85af192f921751fc3dbf6b49e9b.json"}
]

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/html");
    next();
});

app.get('/view', (req , res) => {
    res.render('ViewProjects', {title:'Projects' , projects})
})
app.post('/project' , (req, res) => {
    const {project} = req.body
    res.render('Project' , {title:"project", project })
})
app.post('/projectData' , (req ,res) => {
    axios.get(projects[req.body.project].link)
    .then(response =>{
        res.json(response.data)
    })
})
app.get('/contact', (req , res ) => {
    res.render('Contact', {title: 'Contact Me'})
})
    


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));