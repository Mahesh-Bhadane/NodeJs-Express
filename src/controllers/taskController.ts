import { Request, Response } from "express";
import { connection } from "../db/database";
import { City, Task } from "../types/types";
import multer from "multer";
import path from 'path';
import fs from 'fs';
import { SendEmail } from "../sendMail";

// get all tasks
export const taskName = (req:Request,res:Response) => {
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
  }

  //Add a new task
export const newtask = (req:Request,res:Response)=> {
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
          SendEmail(`${taskData.taskMessage}`)
          return res.status(200).json({ message: "Task added Successfully!" });
      })
    } catch (error:any) {
      return res.status(400).json({ message: error.message||"Unexpected Error occured", error: error.message });
    }
  }
  
  
  //update a task
  export const updateTask = (req:Request,res:Response)=> {
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
  }
  
  //delete a task
  export const deletetask = (req:Request,res:Response) => {
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
  }

  
  //View file
  export const viewFile = (req:Request,res:Response) => {
        const { filename } = req.params;
        const filePath = path.join(__dirname, 'uploads', filename);
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error reading file' });
          }
          return res.send(data);
        });
      }