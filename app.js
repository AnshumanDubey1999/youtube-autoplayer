const express = require('express')
let app = express()

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index')
})

if(process.env.PORT)
  app.listen(process.env.PORT, process.env.IP)
else{
  app.listen(3000, function(){
    console.log("NutritionSystem is on FIRE!!!")
  })
}

