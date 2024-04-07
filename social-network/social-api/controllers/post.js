import { db } from '../connect.js';
import jwt from 'jsonwebtoken';
import moment from "moment";

export const getPost = (req, res) => {

    const userId=req.query.userId;
    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");
        
        const q = userId ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id=p.userid) WHERE p.userid=?`:`SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id=p.userid) LEFT JOIN relationship AS r ON (p.userid=r.followedId) WHERE r.followerId=? OR p.userid = ? ORDER BY p.createdAt DESC`;

        const values = userId ? [userId] : [userInfo.id, userInfo.id]
        db.query(q, values, (err, data) => {
          if(err) return res.status(500).json(err)
          return res.status(200).json(data)
        })
     })
}

export const addPost = (req, res) => {

    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");
        
        const q = "INSERT INTO posts(`desc`, `img`,`createdAt`,`userid`) VALUES (?)";

        const values=[
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ]

        db.query(q, [values], (err, data) => {
          if(err) return res.status(500).json(err)
          return res.status(200).json("post has been created...");
        })
     })
}