import { Router } from "express";
import multer  from 'multer';

import { deletetask, newtask, taskName, updateTask, viewFile } from "../controllers/taskController";
import { authenticateToken } from "../middlewares/verifyJWT";
import {validate} from "../middlewares/validate";
import { DeleteTaskSchema, FileSchema, NewTaskSchema, UpdateTaskSchema } from "../utils/validationSchemas";
const router = Router();

router.get("/taskName",authenticateToken, taskName);
router.post("/newtask",authenticateToken,validate(NewTaskSchema),newtask)  
router.put("/update/:id",authenticateToken, validate(UpdateTaskSchema),updateTask)
router.delete("/delete/:id",authenticateToken, validate(DeleteTaskSchema),deletetask)
router.get('/file/:filename',authenticateToken, validate(FileSchema),viewFile)

  
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