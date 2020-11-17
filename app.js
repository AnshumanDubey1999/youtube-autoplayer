const express = require('express')
const fs = require('fs')
let app = express()

require("dotenv").config()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


let obj = {
  title: 'Video title how to autoplay YouTube video with YouTube url',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto temporibus libero voluptatibus aut excepturi dolores perferendis asperiores eum. Dolorem, ab ad! Assumenda eius dolor quasi neque laborum animi sit totam itaque dolorum, obcaecati ullam libero rerum ratione saepe autem quae, repellendus debitis, consectetur doloremque eveniet exercitationem quam dignissimos accusamus excepturi?',
  videoID: 'Xc25RykxUrM',
  otherVideos: [ 'Xc25RykxUrM','Xc25RykxUrM','Xc25RykxUrM' ]
}

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  let data = fs.readFileSync('./data.json')
  // console.log(data)
  res.render('index', {data: JSON.parse(data)})
})

app.get('/admin-panel', function(req, res){
  let data = fs.readFileSync('./data.json')
  let obj = JSON.parse(data)
  obj.ids = obj.otherVideos.join('|')
  res.render('edit', {data: obj})
})

app.post('/admin-panel', function(req, res){
  // console.log(req.body)
  // console.log(req.body.key, process.env.KEY)
  if(req.body.key != process.env.KEY){
    console.log('Incorrect Password')
    res.redirect('/admin-panel')
  }
  else{
    let data = req.body.val
    data.otherVideos = data.ids.split('|')
    fs.writeFileSync('./data.json', JSON.stringify(data), function(err){
      if(err)
        console.log("Error Occured!")
    })
    res.redirect('/')
  }
})



/*fs.writeFileSync('./data.json', JSON.stringify(obj), function(err){
  if(err)
    console.log("Error Occured!")
})
/*
var rdata = 
console.log(JSON.parse(rdata))
*/

if(process.env.PORT)
  app.listen(process.env.PORT, process.env.IP)
else{
  app.listen(3000, function(){
    console.log("Autoplayer is on FIRE!!!")
  })
}

