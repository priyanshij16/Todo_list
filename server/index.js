const express= require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const app = express()
const TodoModel= require('./Model/Todo')

app.use(cors());
// database connection 
mongoose.connect('mongodb+srv://priyanshijain:uCUCS0byahawWboL@todo-list.img11qf.mongodb.net/?retryWrites=true&w=majority&appName=Todo-List')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// uCUCS0byahawWboL
// to convert the raw data into json format :
app.use(express.json());

app.get('/get',(req,res)=>{
  TodoModel.find()  
  .then(result=>res.json(result))
  .catch(err => res.status(500).json({ message: 'Error fetching tasks', error: err }));

})

app.post('/add', (req,res)=>{
    const {task}= req.body;
    if (!task) {
      return res.status(400).json({ message: 'Task is required' });
  }
    TodoModel.create({task })
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ message: 'Error creating task', error: err }));
})

app.put('/update/:id',(req,res)=>{
  const {id }= req.params;
 TodoModel.findByIdAndUpdate({_id:id} ,{completed:true })
 .then(result => res.status(200).json(result))
 .catch(err => res.status(500).json({ message: 'Error updating task', error: err }));

})
app.delete('/delete/:id',(req,res)=>{
  const {id }= req.params;
  TodoModel.findByIdAndDelete({_id:id})
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json({ message: 'Error Deleting task', error: err }));
 
})
app.listen(3001,()=>{
    console.log(`Server is Running on port 3001`)
})