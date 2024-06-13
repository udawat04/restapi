const Admin=require("../models/adminModel");

const adminController={
    async store(req,res){
        let add;
        try{
            const{username,password}=req.body;
            add = await Admin.create({username,password})
        }catch(error){
            res.status(500).json({error:"server error",serverError:error})
        }
        res.status(201).json(add);
    },
    async take(req,res){
        let call;
        try{
            call=await Admin.find();
        }
        catch(error){
            res.status(500).json({error:"server error",serverError:error})
        }
        res.status(201).json(call);
    },

    async delete(req,res){
        
    }
};

module.exports=adminController;