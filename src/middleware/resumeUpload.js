import multer from "multer";

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'public/resume/')

    },
    filename:(req,file,cb)=>{
        const nameOfFile=Date.now() + '-' + file.originalname;
        req.uploadedFile=nameOfFile
        cb(null,nameOfFile)
    }
})

export const uploadFile = multer({
    storage: storage,
  });