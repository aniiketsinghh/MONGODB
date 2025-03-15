import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
const userSchema=new Schema({
    id:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index:true
    },
        username:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{
            type: String,
            require: true,
            trim: true,
            index:true
        },
        email:{
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        avatar:{
            type: string,
            require: true,
        },
        coverImage:{
            type: string,
        },
        password:{
            type:String,
            require:true
        }
    },
    {
         timestamps: true
    }
)
userSchema.pre("save",async function (next){
    if(!this.isModified('password'))return next();

    this.password= await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){ //for login it will check the pass if it write then true and enter else pass is incorrect!
    return await bcrypt.compare(password,this.password) 
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User= Schema.model("User",userSchema)