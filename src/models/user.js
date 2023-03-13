const { mongoose } = require("mongoose")
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{
    timestamps:true
}); 

userSchema.pre('save',async function encryptPassword(next){
    const user = this;
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
})

userSchema.methods.isValidPassword = async function checkValidity(password){
    const user = this;
    const compare = await bcrypt.compare(password,user.password);
    return compare
}

const User = mongoose.model('User',userSchema);

module.exports = User