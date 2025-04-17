import express from 'express';
import { createPostController, deletePostController, getPostController, getSinglePostController, getUserPostController, updatePostController } from '../controllers/postController.js';
import multer from 'multer';
import path from 'path';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.fieldname+  path.extname(file.originalname));
      console.log(file.originalname)
    }
  });


  const  upload= multer({ storage: storage })

  
router.post('/create',authMiddleware, upload.single('photo'), createPostController)
router.get("/get-post", getPostController)
router.get('/getsingle-post/:id', getSinglePostController)
router.get("/get-user-post", authMiddleware, getUserPostController);
router.delete("/delete-post/:id", authMiddleware, deletePostController);
router.put("/update-post/:id", authMiddleware, upload.single('photo'), updatePostController);

export const postRouter = router;