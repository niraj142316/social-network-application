import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getRelationship = (req, res) => {
  const q = "SELECT followerId FROM relationship WHERE followedId= ?";

  db.query(q, [req.query.followedId], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data.map(relationships=>relationships.followerId));
  })
}

export const addRelationship=(req, res)=>{
     
    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");
        
        const q = "INSERT INTO relationships (`followerId`,`followedId`) VALUES (?)";

        const values=[
            userInfo.id,
            req.body.followedId
        ]

        db.query(q, [values], (err, data) => {
          if(err) return res.status(500).json(err)
          return res.status(200).json("");
        })
     })
}

export const deleteRelationship=(req, res)=>{
     
    const token= req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");
        
        const q = "DELETE FROM relationships WHERE `followerId`=? AND `followedId`=?";

        db.query(q, [userInfo.id, req.query.followedId], (err, data) => {
          if(err) return res.status(500).json(err)
          return res.status(200).json("Unfollowed the user...");
        })
     })
}