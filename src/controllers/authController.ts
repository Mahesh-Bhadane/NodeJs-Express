import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { connection } from "../db/database";
import jwt from "jsonwebtoken";

require('dotenv').config();
const fsPromises = require('fs').promises;

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

    connection.query('SELECT * FROM user WHERE email = ?',[email], async (error:any, results:any) => {
        if (error) {
            console.error('Error fetching user:', error);
            return res.status(500).send('Internal server error');
            
        }
        if (!results.length) {
            return res.status(401).send('Invalid email or password');
            
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const accessToken = jwt.sign(
                { "email": user.email },
                process.env.ACCESS_TOKEN_SECRET!,
                { expiresIn: '2h' }
            );
            const refreshToken = jwt.sign(
                { "email": user.email },
                process.env.REFRESH_TOKEN_SECRET!,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            user.refreshToken = refreshToken;
            connection.query('UPDATE user SET refreshToken = ? WHERE email = ?',[refreshToken, email], (error:any, result:any) => {
                if (error) {
                    console.error('Error updating user with refresh token:', error);
                    return res.status(500).send('Internal server error');
                }
            });

            return res.json({ accessToken });
        } else {
            return res.status(401).send('Invalid email or password');
        }
    });
}
