import mongoose from "mongoose";
const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
},
{
    timestamps: true
});
//create jwt token

// export const generateToken = function () {
//    try{
//     const token = jwt.sign({
//          id: this._id,
//          email: this._email,
//          username: this._username
//          },
//          process.env.TOKEN_SECRET,
//          { expiresIn: '1h' });
//     return token;
//    }
//    catch(err){
//     console.error(err);
//    }
// }

//verify jwt token



export const users = mongoose.model('users', user);