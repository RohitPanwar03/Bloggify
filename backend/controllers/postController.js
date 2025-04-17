import { postModel } from "../models/postModel.js";
import path from "path";
import fs from 'fs';

export const createPostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        const photo = req.file;
        const userId = req.user; // Assuming you have a middleware that sets req.user

        // Validate input       
        if (!title || !description || !photo) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Create new post          
        await postModel.create({
            title,
            description,
            photo: photo.filename,
            userId,
        });

        res.status(200).json({
            success: true,
            message: 'Post created successfully',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in creating post',
            error: error.message,
        })
    }
}

export const getPostController = async (req, res) => {
    try {
        const posts = await postModel.find({}).populate("userId", "-password").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Posts fetched successfully',
            posts,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in getting post',
            error: error.message,
        })
    }
}

export const getUserPostController = async (req, res) => {
    try {
        const user = req.user; // This is the authenticated user from authMiddleware

        // Fetch posts for the user
        const posts = await postModel.find({ userId: user }).populate('userId', 'name email'); // Optionally populate user data
        if (posts.length === 0) {
            return res.status(200).json({ message: 'No posts found for this user' });
        }

        res.status(200).json({
            success: true,
            message: 'User posts fetched successfully',
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in getting user post',
            error: error.message,
        })
    }
}

export const deletePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;


        const post = await postModel.findById(id);

        if (userId !== post.userId.toString()) {
            res.status(404).json({
                success: false,
                message: "You can only Delete your Own Posts"
            })
        }

        const photoPath = path.join("uploads", post.photo);
        fs.unlink(photoPath, (err) => {
            if (err) {
                res.status(400).json({
                    success: false,
                    message: "Error While Deleting Post"
                })
            }
        })

        await postModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while Deleting the Post",
            error: error.message
        })
    }
}

export const updatePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;
        const { title, description } = req.body;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }
        if (userId !== post.userId.toString()) {
            return res.status(404).json({
                success: false,
                message: "You can only Update your Own Posts"
            })
        }

        // Prepare updated fields
        const updatedFields = {
            title: req.body.title || post.title,
            description: req.body.description || post.description,
        };
        if (req.file) {
            // If a new file is uploaded, update the photo field
            // Delete old photo
            const oldPhotoPath = path.join("uploads", post.photo);
            fs.unlink(oldPhotoPath, (err) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: "Error While Deleting Old Photo"
                    })
                }
            });
            updatedFields.photo = req.file.filename;
        }

        await postModel.findByIdAndUpdate(id, updatedFields, { new: true });
        res.status(200).json({
            success: true,
            message: "Post Updated Successfully",
            post: updatedFields
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while Updating the Post",
            error: error.message
        })
    }
}

export const getSinglePostController = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id).populate("userId", "-password");
        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post Not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Post Fetched Successfully",
            post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting the Post",
            error: error.message
        })
    }
}