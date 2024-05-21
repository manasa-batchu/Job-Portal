export default class applicantModel{
    constructor(applicantId,name,email,contact,resumePath) {
        this.applicantId=applicantId;
        this.name=name;
        this.email=email;
        this.contact=contact;
        this.resumePath=resumePath;
    }

}


var applicants=[];