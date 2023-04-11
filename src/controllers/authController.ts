import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { connection } from "../db/database";

//register
export const register = (req:Request,res:Response)=>{

    const saltRounds=10;
    const { email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err: any, hashedPassword: any) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).send('Internal server error');
            return;
        }
        const query = 'INSERT INTO user (email, password) VALUES (?, ?)';
        const values = [email, hashedPassword];
        
        connection.query(query, values, (error, result) => {
            if (error) {
                console.error('Error registering user:', error);
                res.status(500).send('Internal server error');
                return;
            }
            res.status(200).send('User registered successfully');
        });
    })
}

//login 
export const login = (req:Request,res:Response)=>{
    const { email, password } = req.body ;

    const query = 'SELECT * FROM user WHERE email = ?';
    const values = [email];

    connection.query(query, values, async (error, results:any) => {
        if (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal server error');
            return;
        }
        if (results.length === 0) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(200).send('User authenticated successfully');
        } else {
            res.status(401).send('Invalid email or password');
        }
    });
}