import { Request,Response } from "express";
import multer  from 'multer';
require('dotenv').config();
import express from "express";
import { connection } from "./database";
import { City, Task } from "./types";
import path from 'path';
import fs from 'fs';

//create app instance
const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());

// get all cities route
app.get("/", (req:Request, res:Response) => {
  try {
    connection.connect(function (err:any) {
      if (err) {
        throw err;
      } 
    });
    connection.query<City[]>('SELECT * from city',  (_error, result)=> {
        return res.status(200).json({ result, message: "City fetched Successfully!" });
    });

  } catch (error) {
    return res.status(400).json({ message: "Error occured", error: error });
  }
});

// get all tasks
app.get("/task", (req:Request, res:Response) => {
  try {
    connection.connect(function (err:any) {
      if (err) {
        throw err;
      } 
    });
    connection.query<Task[]>('SELECT * from tasks',  (_error, result)=> {
        return res.status(200).json({ result, message: "Task fetched Successfully!" });
    });

  } catch (error) {
    return res.status(400).json({ message: "Error occured", error: error });
  }
});

//get user and product
app.get("/user", (req:Request, res:Response) => {
  try {
    connection.connect(function (err:any) {
      if (err) {
        throw err;
      } 
    });
    connection.query<any>
    ("SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id", 
     (_error, result)=> {
        return res.status(200).json({ result, message: "Task fetched Successfully!" });
    });

  } catch (error) {
    return res.status(400).json({ message: "Error occured", error: error });
  }
});



//Add a new task
app.post("/newtask", (req: Request, res: Response) => {
  try {
    const { task_message } = req.body;

    if(!task_message){
      throw new Error("Task message is missing");
    }

    const taskData = {
      taskMessage: task_message ,
      createdAt : new Date(),
      UpdatedAt : new Date(),
    }
    connection.query<Task[]>("INSERT INTO tasks SET ?",taskData, (_error)=> {
        return res.status(200).json({ message: "Task added Successfully!" });
    })
  } catch (error:any) {
    return res.status(400).json({ message: error.message||"Unexpected Error occured", error: error.message });
  }
});


//update a task
app.put("/update/:id", async (req: Request, res: Response) => {
  try{
  const { task_message,status } = req.body;
  const { id } = req.params;
  
  if (!id)
    res.status(400).json({
      error: `Id of the task not found `
    });
    let query = "UPDATE tasks SET taskMessage=?";
    let values = [task_message];
    if(status){
      query+=", status=? "
      values.push(status)
    }
    query+="WHERE id=?"
    values.push(id)
    connection.query<Task[]>(query,
    values, (_error)=> {
      return res.status(200).json({ message: "Task Updated Successfully!" });
  })
  } 
  catch (error) {
    res.status(400).json({
      error: `Error occured while trying to update the task`,
      errorMsg: error,
    });
  }
});

//delete a task
app.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
  const { id } = req.params;
  if (!id) res.status(400).json({ error: `Id of the task was not obtained` });

    connection.query<Task[]>("DELETE FROM tasks WHERE id=?",
    [req.params.id], (_error)=> {
      return res.status(200).json({ message: `Task deleted successfully!` });
  })    
  } catch (error) {
    res.status(400).json({
      error: `Error occured while deleting the task`,
      errorMsg: error,
    });
  }
});

//upload file
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req: any, res) => {
  try{
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: `No File Uploaded!` }); 
    }
    return res.status(200).json({ filename: req.file.originalname, message: `file uploaded successfully!` });
  }
  catch (error) {
    res.status(400).json({
      error: `Error occured while uploading the file`,
      errorMsg: error,
    });
  }
});

//View file
app.get('/file/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error reading file' });
    }
    return res.send(data);
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
