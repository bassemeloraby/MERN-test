const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

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
app.get('/create/:title', (req, res) => {
  const firstTask = new Task({ title: req.params.title });
  firstTask.save().then(() => console.log('new task saved'));
});
//show
app.get('/', (req, res) => {
  Task.find({},(error,tasks)=>{
    if (error) console.log(`there is an error ${error}`);
    else {res.render('todo.ejs')}
  })
});
//delete
app.get('/delete/:id', (req, res) => {
 Task.deleteOne({_id: req.params.id},(error)=>{
  if (error) console.log(`there is an error ${error}`)
  else {
    console.log('one task deleted successfully')
  }
 })
});
//update tasks
app.get('/update/:id/:title', (req, res) => {
 Task.updateOne({_id: req.params.id},{title: req.params.title},(error)=>{
  if (error) console.log(`there is an error ${error}`)
  else {
    console.log('task is updated successfully!')
  }})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//node server.js
