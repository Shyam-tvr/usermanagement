const userModel = require('../model')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
module.exports = {
    doSignUp : (data)=>{
        return new Promise(async(resolve,reject)=>{
            let userExist = await userModel.findOne({email : data.email})
            if (! userExist){
                let password = await bcrypt.hash(data.password,10)
                try {
                    userModel.create({
                        name: data.name,
                        email: data.email,
                        password : password,
                        active: true,
                        role: 'user'
                    }).then(()=>{
                        resolve("success")
                    })
                } catch (error) {
                    console.log(error);
                    reject()
                }
            }else{
                resolve({error:"user already exists"})
            }
        })
    },
    doLogin:(data) => {
        return new Promise((resolve, reject) => {
            userModel.findOne({email:data.email}).then(async(user) => {
                if (user) {
                    if (user.active || user.role === 'admin') {
                        let status = await bcrypt.compare(data.password,user.password)
                        if (status){
                            var token = jwt.sign({ email: user.email, username : user.name }, "qwerty", {expiresIn: '30m' });
                            resolve({user,token})
                        }
                        else {
                            resolve({loginError:"invalid Username or password"})
                        }
                    }else{
                        resolve({loginError:"You are Blocked by Admin"})
                    }
                }else{
                    resolve({loginError:"invalid Username or password"})
                }
            });
        })
    }
}