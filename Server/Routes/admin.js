var express = require("express");
const adminHealper = require("../Helpers/adminHealper");
var router = express.Router();
const jwt = require("jsonwebtoken")

router.get('/',async(req,res)=>{
    try{
        const token =await jwt.verify(req.headers['access-token'],'qwerty')
        adminHealper.getUser().then((response)=>{
            return res.json(response)
        })
    }catch(err){
        res.json({error: 'token not valid'})
    }
    
})

router.post('/user_manage',(req,res)=>{
    adminHealper.manageUser(req.body).then((status)=>{
        return res.json({status: status})
    })
})

router.post('/deleteUser',(req,res)=>{
    adminHealper.deleteUser(req.body).then(()=>{
        return res.json({status: 'deleted'})
    })
})

router.post('/editUser',(req,res)=>{
    adminHealper.editUser(req.body).then(()=>{})
})

module.exports = router;