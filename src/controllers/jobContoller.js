import JobModel from "../models/jobModel.js";

class JobController{
    getHome(req,res){
        const isRecruiter = req.session.email? true : false;
        res.render('index',{recruiterEmail:req.session.email,recruiterName:req.session.name,isRecruiter:isRecruiter});
    }
    getJobs(req,res,next){
        const jobsData=JobModel.getAll();
        res.render('jobListing',{jobsData,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }

    searchJobs(req,res){
        const q=req.query.seachInput;
        console.log(q);
        const jobsData=JobModel.getSearchResults(q);
        res.render('jobListing',{jobsData,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }


    createNewPost(req,res,next){
        res.render('newJob',{recruiterEmail:req.session.email,recruiterName:req.session.name})
    }

    postJobs(req,res,next){
        const {jobcategory,jobdesignation,joblocation,companyname,salary,applyby,skillsrequired,numberofopenings}=req.body;
        JobModel.postJob(jobcategory,jobdesignation,joblocation,companyname,salary,applyby,skillsrequired,numberofopenings,req.session.email)
        const jobsData=JobModel.getAll();
        res.render('jobListing',{jobsData,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }

    getUpdateJobs(req,res,next){
        const id=req.params.id;

        const job=JobModel.getJobById(id);
        console.log(req.session.email)
        if (job.recruiterEmail !== req.session.email) {
            // Unauthorized access
            return  res.render('404',{errorMsg:'Unauthorized acccess',recruiterEmail:req.session.email,recruiterName:req.session.name})
        }
        res.render('updateJob',{job,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }

    postUpdateJobs(req,res,next){
        const id=req.params.id;
        console.log(req.body)
        const jobData=JobModel.getJobById(id);
        if (jobData.recruiterEmail !== req.session.email) {
            // Unauthorized access
            return res.render('404',{errorMsg:'Unauthorized acccess',recruiterEmail:req.session.email,recruiterName:req.session.name})
        }
        JobModel.updateJob(req.body,id)        
        res.render('jobDetails', {jobData ,recruiterEmail:req.session.email,recruiterName:req.session.name})
        // res.render('jobListing',{jobsData,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }

    deleteJob(req,res,next){
        const id=req.params.id;
        
        const job = JobModel.getJobById(id);
        console.log(job.recruiterEmail,req.session.email)
        if (job.recruiterEmail !== req.session.email) {
            // Unauthorized access
            return res.render('404',{errorMsg:'Unauthorized acccess',recruiterEmail:req.session.email,recruiterName:req.session.name})
        }
        JobModel.deleteJobs(id)
        const jobsData=JobModel.getAll();
        res.render('jobListing',{jobsData,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }

    getJobsById(req,res,next){
        const id=req.params.id;
        const jobData=JobModel.getJobById(id);
        res.render('jobDetails', {jobData ,recruiterEmail:req.session.email,recruiterName:req.session.name})
        // ,emailRecruiter:req.session.email
    }

    applyJob(req,res,next){
        const id=req.params.id;
        const resume=req.uploadedFile;
        const {name,email,contact}=req.body;
        JobModel.applyJob(id,name,email,contact,resume)

        const jobsData=JobModel.getAll();
        res.render('jobListing',{jobsData,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }

    getApplicants(req,res,next){
        const id=req.params.id;
        const applicants=JobModel.getApplicants(id);
        res.render('applicantList',{applicants,recruiterEmail:req.session.email,recruiterName:req.session.name})
    }
}

export default JobController;