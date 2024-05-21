import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import JobController from './src/controllers/jobContoller.js';
import UserController from './src/controllers/userController.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { uploadFile } from './src/middleware/resumeUpload.js';
import sendMail  from './src/middleware/sendMail.js';
import { auth } from './src/middleware/authMiddleware.js';
import { setLastVisit } from './src/middleware/lastVisit.js';
const app=express();


app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

const jobController=new JobController();
const userController=new UserController();


app.use(ejsLayouts)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views',path.join(path.resolve(),'src','views'))


app.get('/',jobController.getHome)

app.get('/jobs',setLastVisit,jobController.getJobs);
app.get('/postjob',auth,jobController.createNewPost)
app.post('/jobs',jobController.postJobs);
app.get('/jobs/:id',jobController.getJobsById)

app.get('/search',jobController.searchJobs)

app.get('/jobs/:id/update',jobController.getUpdateJobs)
app.post('/jobs/:id/update',jobController.postUpdateJobs)

app.get('/jobs/:id/delete',jobController.deleteJob)

app.get('/jobs/:id/applicants',jobController.getApplicants)

app.get('/login',userController.getLogin)
app.post('/register',userController.postRegister)
app.post('/login',userController.postLogin)
app.get('/logout',userController.logout)


app.post('/apply/:id',uploadFile.single('resume'),(req,res,next)=>{
    sendMail(req.body.email);
    next();
    },jobController.applyJob);
app.listen(3000,()=>{
    console.log('Server is running in PORT 3000')
})

