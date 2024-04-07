import mysql from 'mysql';

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3300,
    password:"niraj123",
    database:"social"
});