import mssql from 'mssql';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import {v4} from 'uuid';
import {user} from "../Interfaces/users";
import { sqlConfig } from "../Config/sql.config";
import { registerUserSchema } from '../Validators/user.validator';

export const createUser = async(req: Request, res: Response)=>{
    try{
        const id = v4()

        const {firstname, lastname, email,  password}:user = req.body

        const hashed_pwd = await bcrypt.hash(password, 3)

        let {error} = registerUserSchema.validate(req.body)

        if(error){
            return res.status(400).json({
                error: error
            })
        }
        const pool = await mssql.connect(sqlConfig)

        let result = await(await pool.request()
        .input("userId", mssql.VarChar, id)
        .input("firstname", mssql.VarChar, firstname)
        .input("lastname", mssql.VarChar, lastname)
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, hashed_pwd)
        .execute('createuser')).rowsAffected

        return res.json({
            message:"Account created successfully",
        })
    } catch(error) {
        return res.status(500).json({error: error})
    }
}