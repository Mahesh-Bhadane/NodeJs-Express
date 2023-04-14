import { Request, Response } from "express";
import { connection } from "../models/database";
import { City } from "../types/types";

//get all cities route
export const cityName = (req:Request,res:Response) => {
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
  }

  //get user and product
  export const user = (req:Request,res:Response) => {
    try {
      connection.connect(function (err:any) {
        if (err) {
          throw err;
        } 
      });
      connection.query<any>
      ("SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id", 
       (_error, result)=> {
          return res.status(200).json({ result, message: "User fetched Successfully!" });
      });
  
    } catch (error) {
      return res.status(400).json({ message: "Error occured", error: error });
    }
  }