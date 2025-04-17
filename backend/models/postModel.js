import mongoose from "mongoose";

const postSchema = new mongoose.Schema( 
    {
        title: {
        type: String,
        required: true,
        },
        description: {
        type: String,
        required: true,
        },
        photo: {
        type: String,
        required: true,
        },
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        },
    },
    {
        timestamps: true,
    }
    );

    const Post =mongoose.model("Posts", postSchema);
    export const postModel = Post;