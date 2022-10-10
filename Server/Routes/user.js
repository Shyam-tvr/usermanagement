const { response } = require("express");
const express = require("express");
const userHelper = require("../Helpers/userHelper");
const router = express.Router();

router.post('/signup',(req,res)=>{ 
    userHelper.doSignUp(req.body).then((response)=>{
        if(response === 'success'){
            return res.json({status: 'success'});
        }else{
            return res.json({error: response.error});
        }
    })
})

router.post('/login',async(req,res)=>{
    userHelper.doLogin(req.body).then((response)=>{
        if(response.loginError){
            return res.json({error: response.loginError})
        }else{
            return res.json(response)
        }
    })
})
module.exports = router;