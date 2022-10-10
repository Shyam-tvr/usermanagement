const userModel = require('../model')

module.exports = {
    getUser: ()=>{
        return new Promise(async(resolve, reject) => { 
            let users = await userModel.find({role : 'user'})
            resolve(users)
        })
    },
    manageUser:({_id,status})=>{
       status = !status 
        return new Promise(async(resolve, reject) => {
            userModel.updateOne(
                {
                    _id : _id
                },
                {
                    $set : {
                        active : status
                    }
                }
            ).then(() => {
                resolve()
            })
        })
    },
    deleteUser:({_id})=>{
        return new Promise(async(resolve, reject) => {
            userModel.deleteOne({_id: _id}).then((response) => {
                console.log(response);
                resolve()
            })
        })
    },
    editUser:({name,email,_id})=>{
        return new Promise(async(resolve, reject) => {
            userModel.updateOne(
                { 
                    _id :_id
                },
                {
                    $set : {
                        name :name,
                        email : email
                    }
                }
            ).then((response) => {
                console.log(response);
            })
        })
    }
}