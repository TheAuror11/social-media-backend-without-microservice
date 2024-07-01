const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    hashtags: [{ type: String }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    comments: 
        [{ type: Schema.Types.ObjectId, 
        ref: 'Comment' }],
    likes: 
        [{ type: Schema.Types.ObjectId, 
        ref: 'User' }],
    viewCount: { 
      type: Number, 
      default: 0 
    },
  },
  
  { timestamps: true }
);

const Post = model("post", postSchema);

module.exports = Post;
