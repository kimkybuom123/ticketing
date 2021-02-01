import { requireAuth } from './../middleware/require-auth';
import express ,{ Router } from "express";
import { currentUser } from '../middleware/current-user';


const router = express.Router()


router.get("/api/currentuser/",currentUser,requireAuth, (req, res) => {
    res.send({currentUser:req.currentUser||null})
})


export { router as currentUserRouter }
