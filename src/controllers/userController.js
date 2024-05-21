import userModel from "../models/userModel.js";
import JobModel from "../models/jobModel.js";

class userController{
    postRegister(req,res,next){
        const {name,email,password}=req.body;
        userModel.add(name,email,password);
        res.redirect('/login')
    }

    getLogin(req,res,next){
        res.render('login',{errorMessage:null})
    }

    postLogin(req,res,next){
        const {email,password}=req.body;
        const user=userModel.validateCreds(email,password);
        if(!user){
            return res.render('404', {
                errorMsg: 'User not found. Please Register',recruiterEmail:req.session.email,recruiterName:req.session.name
              });
        }

        req.session.email=email;
        req.session.name=user.name;
        const jobsData=JobModel.getAll();
        res.render('jobListing',{jobsData,recruiterEmail: req.session.email, recruiterName: req.session.name})
    }

    logout(req,res,next){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/login')
            }
        })
    }
}

export default userController;