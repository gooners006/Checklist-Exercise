// const express = require('express');
// const app = express();
// const nunjucks = require('nunjucks');

// nunjucks.configure('views', {
//     autoescape: true,
//     express: app
// });

// app.get('/', (req, res) => {
//     let doremon = ['viet anh', 'phuoc', 'khue', 'quyet'];
//     res.render('index.html', {
//         title: 'demo nunjucks',
//         data: doremon
//     })
// })

// app.listen(8080, () => {
//     console.log('running');
// })

const express = require('express');

const app = express();

const fs = require('fs');

const nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/addPhone', (req, res) => {
  res.render('addPhone.html');
});
app.get('/getPhone', (req, res) => {
  res.render('getPhone.html');
});
app.get('/updatePhone', (req, res) => {
  res.render('updatePhone.html');
});
app.get('/deletePhone', (req, res) => {
  res.render('deletePhone.html');
});
app.get('/nunjucks', (req, res) => {
  const doremon = ['viet anh', 'phuoc', 'khue', 'quyet'];
  res.render('nunjucks.html', {
    title: 'demo nunjucks',
    data: doremon,
  });
});

// Create
app.post('/add', (req, res) => {
  console.log(req.body);
  fs.readFile('iphoneDatabase.json', 'utf-8', (err, data) => {
    const obj = { id: req.body.id, name: req.body.name, price: req.body.price };
    data = JSON.parse(data);
    data.push(obj);
    fs.writeFile('iphoneDatabase.json', JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  });
});
// Read
app.get('/', (req, res) => {
  function dnd() {
    return new Promise((res, rej) => {
      fs.readFile('iphoneDatabase.json', 'utf-8', (err, data) => {
        if (err) rej(err);
        res(data);
      });
    });
  }

  dnd()
    .then(data => res.json(data))
    .catch(err => console.log(err));
  // fs.readFile('iphoneDatabase.json', 'utf-8', (err, data) => {
  //     if (err) throw err;
  //     res.send(data);
  // });
});
app.get('/phone/:id', (req, res) => {
  const id = +req.params.id;
  fs.readFile('iphoneDatabase.json', 'utf-8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data.forEach((element) => {
      if (element.id === id) {
        res.send(element);
      }
    });
  });
});

// update
app.put('/update', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  fs.readFile('iphoneDatabase.json', 'utf-8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data.forEach((element) => {
      if (element.name === name) {
        element.price = req.body.price;
        fs.writeFile('iphoneDatabase.json', JSON.stringify(data), (err) => {
          if (err) throw err;
        });
      }
    });
  });
});
// delete
app.delete('/delete', (req, res) => {
  const name = req.body.name;
  console.log(`delete ${name}`);
  fs.readFile('iphoneDatabase.json', 'utf-8', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data.forEach((element) => {
      if (element.name === name) {
        data.splice(data.indexOf(element), 1);
        console.log(data);
        fs.writeFile('iphoneDatabase.json', JSON.stringify(data), (err) => {
          if (err) throw err;
        });
      }
    });
  });
});
app.listen(3001, () => {
  console.log('running');
});
