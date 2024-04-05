const Comment = require('../model/comments');

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found'
            });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

const createComment = async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found'
            });
        }
        await comment.update(req.body);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found'
            });
        }
        await comment.destroy();
        res.status(200).json({
            message: 'Comment deleted'
        });
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
};

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};