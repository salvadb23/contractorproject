const methodOverride = require('method-override');
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/customChamps');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const Champion = require('./models/champion')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));



app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
})

app.get('/', (req, res) => {
  Champion.find()
    .then(champions => {
      res.render('champions-index', { champions: champions });
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/champions/new', (req, res) => {
  res.render('champions-new', {});
})

app.post('/champions', (req, res) => {
  Champion.create(req.body).then((champion) => {
    console.log(champion);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

app.get('/champions/:id', (req, res) => {
  Champion.findById(req.params.id).then((champion) => {
    res.render('champions-show', { champion: champion })
  }).catch((err) => {
    console.log(err.message);
  })
})

app.get('/champions/:id/edit', (req, res) => {
  Champion.findById(req.params.id, function(err, champion) {
    res.render('champions-edit', {champion: champion});
  })
})

app.put('/champions/:id', (req, res) => {
  Champion.findByIdAndUpdate(req.params.id, req.body)
    .then(champion => {
      res.redirect(`/champions/${champion._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

app.delete('/champions/:id', function (req, res) {
  console.log("DELETE champion")
  Champion.findByIdAndRemove(req.params.id).then((champion) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

module.exports = app;