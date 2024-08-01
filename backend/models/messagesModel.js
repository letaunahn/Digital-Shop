import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    conservationId: {
        type: String,
    },
    text: {
        type: String
    },
    sender: {
        type: String
    },
    images: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
},{ timestamps: true})

const messagesModel = mongoose.model("Messages", messagesSchema)
export default messagesModel