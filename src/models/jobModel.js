import applicantModel from "./applicantModel.js";

export default class JobModel{
    constructor(id,jobcategory,jobdesignation,joblocation,companyname,salary,applyby,skillsrequired,numberofopenings,jobposted,recruiterEmail){
        this.id=id,
        this.jobcategory=jobcategory,
        this.jobdesignation=jobdesignation,
        this.joblocation=joblocation,
        this.companyname=companyname,
        this.salary=salary,
        this.applyby=applyby,
        this.skillsrequired=skillsrequired,
        this.numberofopenings=numberofopenings,
        this.jobposted=jobposted,
        this.recruiterEmail = recruiterEmail;
        this.applicants=[];
    }
    static getAll(){
        console.log(jobs)
        return jobs;
    }

    static getSearchResults(query){
        return jobs.filter(job => job.jobdesignation.toLowerCase().includes(query.toLowerCase()));
    }
    
    static getJobById(id){
        const job=jobs.find((j)=>j.id==id);
        return job;
    }

    static postJob(jobcategory,jobdesignation,joblocation,companyname,salary,applyby,skillsrequired,numberofopenings,recruiterEmail){
        const jobposted = new Date();     
        const skillsArray = Array.isArray(skillsrequired)? skillsrequired : [skillsrequired];   
        const newJob=new JobModel(
            jobs.length+1,
            jobcategory,jobdesignation,joblocation,companyname,salary,applyby,skillsArray,numberofopenings,jobposted.toString(),recruiterEmail
        )
        jobs.push(newJob)
    }

    static updateJob(body,id){
        const jobIndex=jobs.findIndex((j)=>j.id==id);
        console.log(id);
        const updatedJob=jobs[jobIndex];
        const {jobcategory,jobdesignation,joblocation,companyname,salary,numberofopenings,skillsrequired,applyby}=body;
        const skillsArray = Array.isArray(skillsrequired)? skillsrequired : [skillsrequired];   
        updatedJob.jobcategory=jobcategory;
        updatedJob.jobdesignation=jobdesignation;
        updatedJob.joblocation=joblocation;
        updatedJob.companyname=companyname;
        updatedJob.salary=salary;
        updatedJob.numberofopenings=numberofopenings;
        updatedJob.skillsrequired=skillsArray;
        updatedJob.applyby=applyby;
        console.log(jobs)
    }

    static deleteJobs(id){
        const jobIndex=jobs.findIndex((j)=>j.id==id);
        jobs.splice(jobIndex,1)
    }
    static applyJob(id,name,email,contact,resume){
        const job=jobs.find((j)=>j.id==id)
        const jobSeeker=new applicantModel(job.applicants.length + 1,name,email,contact,resume)
        job.applicants.push(jobSeeker)
    }

    static getApplicants(id){
        const job=jobs.find((j)=>j.id==id);
        return job.applicants;
    }
}

var jobs=[
    new JobModel(
        1,
        'Tech',
        'SDE',
        'Pune',
        'TCS',
        '6-10 LPA',
        '2024-05-24',
        ['React'],
        2,
        '09-05-2024 11:56AM',
        'manasa@gamil.com'
    ),
    new JobModel(
        2,
        'Tech',
        'MERN Developer',
        'Pune',
        'TCS',
        '6-10 LPA',
        '2024-05-24',
        ['React'],
        3,
        '09-05-2024 11:56AM',
        'manasa@gamil.com'
    ),
    new JobModel(
        3,
        'Tech',
        'MEAN Developer',
        'Pune',
        'TCS',
        '6-10 LPA',
        '2024-05-24',
        ['React','NodeJS','JS','Angular','MongoDB'],
        2,
        '09-05-2024 11:56AM',
        'manasa@gamil.com'
    ),

]
