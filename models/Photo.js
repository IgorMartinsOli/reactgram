const mongoose = require('mongoose');
const { Schema } = mongoose;

const photoSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String },
    likes: { type: Array, default: 0 },
    comments: { type: Array, default: [] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    username: { type: String, required: true },
},
{
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;