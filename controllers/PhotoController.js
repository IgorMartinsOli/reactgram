const Photo = require('../models/Photo');
const User = require('../models/User');
const mongoose = require('mongoose');
const { body } = require('express-validator');

const createPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;
    const reqUser = req.user;

    const user = await User.findById(reqUser._id).select("-password");

    const newPhoto = await Photo.create({
        title,
        image,
        userId: user._id,
        username: user.name
    });

    if (!newPhoto) {
        return res.status(500).json({ errors: ["Photo not created"] });
    }
    
    res.status(201).json(newPhoto);
}

const deletePhoto = async (req, res) => {
    const photoId = req.params.id;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).json({ errors: ["Photo not found"] });
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
            return;
        }

        await Photo.findByIdAndDelete(photoId);

        res.status(200).json({ id: photo._id, message: "Photo deleted"});
    } catch (error) {
        return res.status(500).json({ errors: [`Internal server error: ${error.message}`] });
    }
}

//get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(photos);
}

//get photo by user id
const getUserPhotos = async (req, res) => {
    const userId = req.params.id;
    const photos = await Photo.find({ userId }).sort({ createdAt: -1 }).exec();
    res.status(200).json(photos);
}

//get photo by id
const getPhotoById = async (req, res) => {
    const photoId = req.params.id;
    const photo = await Photo.findById(photoId);

    if (!photo) {
        return res.status(404).json({ errors: ["Photo not found"] });
    }

    res.status(200).json(photo);
}

const updatePhoto = async (req, res) => {
    const photoId = req.params.id;
    const { title } = req.body;
    const reqUser = req.user;

    try {
        const user = await User.findById(reqUser._id).select("-password");
        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).json({ errors: ["Photo not found"] });
        }

        if (!photo.userId.equals(user._id)) {
            res.status(422).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
            return;
        }

        photo.title = title;
        await photo.save();

        res.status(200).json(photo);
    } catch (error) {
        return res.status(500).json({ errors: [`Internal server error: ${error.message}`] });
    }
}

const photoUpdateValidation = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('Title is required')
            .not()
            .equals("undefined")
            .withMessage("Title cannot be undefined")
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters')
    ];
}

const likePhoto = async (req, res) => {
    const photoId = req.params.id;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(photoId);
        const user = await User.findById(reqUser._id).select("-password");

        if (!photo) {
            return res.status(404).json({ errors: ["Photo not found"] });
        }

        if (photo.likes.includes(user._id)) {
            res.status(422).json({errors: ["Photo already liked.    "]});
        }

        photo.likes.push(user._id);

        await photo.save();
        res.status(200).json({photoId, userId: user._id, message: "Photo liked"});
    }
    catch (error) {
        return res.status(500).json({ errors: [`Internal server error: ${error.message}`] });
    }
}

const commentPhoto = async (req, res) => {
    const photoId = req.params.id;
    const reqUser = req.user;
    const { comment } = req.body;

    try {
        const photo = await Photo.findById(photoId);
        const user = await User.findById(reqUser._id).select("-password");

        if (!photo) {
            return res.status(404).json({ errors: ["Photo not found"] });
        }

        if(!user){
            return res.status(404).json({ errors: ["User not found"] });
        }

        const newComment = {
            comment,
            username: user.name,
            userImage: user.image,
            userId: user._id
        };

        photo.comments.push(newComment);

        await photo.save();
        res.status(200).json({comment: newComment, message: "Comment added"});
    }
    catch (error) {
        return res.status(500).json({ errors: [`Internal server error: ${error.message}`] });
    }
}

const searchPhotos = async (req, res) => {
    const q = req.query.q;
    const photos = await Photo.find({ title: { $regex: q, $options: 'i' } }).sort({ createdAt: -1 }).exec();
    res.status(200).json(photos);
}

module.exports = {
    createPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    photoUpdateValidation,
    likePhoto,
    commentPhoto,
    searchPhotos
}