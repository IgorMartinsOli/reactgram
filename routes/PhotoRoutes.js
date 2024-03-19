const express = require('express');
const router = express.Router();

const { photoInsertValidation, commentValidation } = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard');
const validation = require('../middlewares/handleValidation');
const { imageUpload } = require('../middlewares/imageUpload');

const {
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
} = require('../controllers/PhotoController');

router.post('/', authGuard, imageUpload.single("image"), photoInsertValidation(), validation, createPhoto);
router.delete('/:id', authGuard, deletePhoto);
router.get('/', authGuard, getAllPhotos);
router.get('/user/:id', authGuard, getUserPhotos);
router.get('/search', authGuard, searchPhotos);
router.get('/:id', authGuard, getPhotoById);
router.put('/:id', authGuard, photoUpdateValidation(), validation, updatePhoto);
router.put('/like/:id', authGuard, likePhoto);
router.put('/comment/:id', authGuard, commentValidation(), commentPhoto);


module.exports = router;