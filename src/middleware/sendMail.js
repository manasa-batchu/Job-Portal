
import nodemailer from 'nodemailer';

async function sendMail(applicantEmail){

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'codingninjas2k16@gmail.com',
        pass:'slwvvlczduktvhdj'
    }
});


const mailOptions = {
    from: 'codingninjas2k16@gmail.com',
    to: applicantEmail,
    subject: 'Coding Ninjas Jobs',
    text: 'Applied for job successfuly',
};


try{
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
}catch(err){
    console.log('Email send failer with error: '+ err);
}
}

export default sendMail;
