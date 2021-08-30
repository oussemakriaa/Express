const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path =require('path')
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));


const serverMiddleWare = (req, res, next)=> {
  var date = new Date();
  var day = date.getDay();
  var hour = date.getHours();

  if (day >= 1 && day <= 4 && hour >= 9 && hour <= 18) {
    next();
  } else {
    res.send('server closed');
  }
}

app.use(serverMiddleWare);

app.get('/', (req, res) => {
  fs.readFile('./index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.get('/service', (req, res) => {
  fs.readFile('./service.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});
app.get('/contact', (req, res) => {
  fs.readFile('./contact.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});



app.listen(PORT, console.log(`Server started on port ${PORT}`));