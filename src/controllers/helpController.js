const helpDetails =(req,res)=>{
    return res.status(200).send({
        msg:"Successfully hit the api",
        success:true,
        data:{
            contact:"+91XXXXXXXXXX"
        }
    })
};

module.exports = {
    helpDetails
}

