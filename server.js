const express = require('express');
const app = express();
const mongoose = require('mongoose');

const methodOverride = require('method-override');
const { render } = require('ejs');
//Lets you use HTTP verbs such as PUT or DELETE in places
// where the client doesn't support it.

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// set the view engine to ejs
app.set('view engine', 'ejs');
//set the static assets
app.use(express.static('public'))

const port = process.env.PORT || '3000';

//mongoodb.connect
mongoose.connect(
  `mongodb://localhost:27017/MERN`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log('connected');
  }
);

//models.connect
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', schema);

//insert
app.post('/create', (req, res) => {
  const firstTask = new Task({ title: req.body.title });
  firstTask.save().then(() => res.redirect('/'));
});
//show
app.get('/', (req, res) => {
  Task.find({}, (error, tasks) => {
    if (error) console.log(`there is an error ${error}`);
    else {
      res.render('todo.ejs', { todotasks: tasks });
    }
  });
});
//delete
app.delete('/delete/:id', (req, res) => {
  Task.deleteOne({ _id: req.params.id }, (error) => {
    if (error) console.log(`there is an error ${error}`);
    else {
      res.redirect('/')
    }
  });
});

//update tasks
app.get('/update/:id', (req, res) => {
  const id = req.params.id;
  Task.find({}, (err, tasks) => {
    res.render('todoEdit.ejs', { todotasks: tasks, idTask: id });
  });
});
//update save 
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  Task.findByIdAndUpdate(id, {title:req.body.title},err=>{
    if(err) return res.send(500,err)
    else res.redirect('/')
  })
});

//admin routes
app.get('/admin',(req,res)=>{
  res.render('admin')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//node server.js
