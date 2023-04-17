import { Request, Router } from "express";
import multer from "multer";
import csvParser from "csv-parser";
import {
  deletetask,
  newtask,
  taskName,
  updateTask,
  viewFile,
} from "../controllers/taskController";
import { authenticateToken } from "../middlewares/verifyJWT";
import { validate } from "../middlewares/validate";
import {
  DeleteTaskSchema,
  FileSchema,
  NewTaskSchema,
  UpdateTaskSchema,
} from "../utils/validationSchemas";
import { connection } from "../models/database";
import fs from 'fs'
const router = Router();

router.get("/taskName", authenticateToken, taskName);
router.post("/newtask", authenticateToken, validate(NewTaskSchema), newtask);
router.put(
  "/update/:id",
  authenticateToken,
  validate(UpdateTaskSchema),
  updateTask
);
router.delete(
  "/delete/:id",
  authenticateToken,
  validate(DeleteTaskSchema),
  deletetask
);
router.get(
  "/file/:filename",
  authenticateToken,
  validate(FileSchema),
  viewFile
);

//upload file
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req: any, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: `No File Uploaded!` });
    }
    return res
      .status(200)
      .json({
        filename: req.file.originalname,
        message: `file uploaded successfully!`,
      });
  } catch (error) {
    res.status(400).json({
      error: `Error occured while uploading the file`,
      errorMsg: error,
    });
  }
});


//upload CSV
router.post('/uploadCSV', upload.single('file'), (req:any, res) => {
  const file = req.file;

  if (!file) {
        res.status(400).send({ error: 'No file uploaded' });
        return;
      }

  const results: any = [];
  fs.createReadStream(file.path,'utf8')
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const values = results.map((result:any) => [result.name]);
      connection.query('INSERT INTO mytable (name) VALUES ?', [values], (error) => {
        if (error) {
          console.error(error);
          if (error?.code === "ER_DUP_ENTRY") {
            res.status(400).json({
              error: "Duplicate data",
              errorMsg: error,
            })}
          res.status(500).send('Database error');
          return;
        }
        
        res.send('File uploaded successfully');
      });
    });
});

  


export default router;
