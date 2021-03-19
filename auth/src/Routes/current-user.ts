import { requireAuth } from '@sgticket/common';
import express ,{ Router } from "express";
import { currentUser } from '@sgticket/common';

const router = express.Router()


router.get("/api/users/currentuser/",currentUser,requireAuth, (req, res) => {
    res.send({currentUser:req.currentUser||null})
})


export { router as currentUserRouter }
