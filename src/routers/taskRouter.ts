import { Router } from "express";
import { connection } from "../db/database";
import multer  from 'multer';

import { deletetask, newtask, taskName, updateTask, viewFile } from "../controllers/taskController";
const router = Router();

router.get("/taskName", taskName);
router.post("/newtask",newtask)  
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deletetask)
router.get('/file/:filename', viewFile)

  
//upload file
  const upload = multer({ dest: 'uploads/' });
  
  router.post('/upload', upload.single('file'), (req: any, res) => {
    try{
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: `No File Uploaded!` }); 
      }
      return res.status(200).json({ filename: req.file.originalname, message: `file uploaded successfully!` });
    }
    catch (error) {
      res.status(400).json({
        error: `Error occured while uploading the file`,
        errorMsg: error,
      });
    }
  });
  


  export default router;