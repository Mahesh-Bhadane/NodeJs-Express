import { RowDataPacket } from "mysql2";

export interface City extends RowDataPacket {
    city_id: number,
    city:string,
    country_id: number,
    last_update: Date
}

export interface Task extends RowDataPacket {
    taskMessage: string ,
    createdAt :  Date,
    UpdatedAt : Date,
}