import { Router } from "express";
import { connection } from "../database";
import { City } from "../types";

const router = Router();


// get all cities route
router.get("/cityName", (req, res) => {
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


  //get user and product
  router.get("/user", (req, res) => {
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

  export default router;