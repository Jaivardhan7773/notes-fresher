const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');
const { createNoteSchema, updateNoteSchema } = require('../utils/validators');

const router = express.Router();

// create note
router.post('/', auth, async (req, res, next) => {
  try {
    const { error, value } = createNoteSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    const note = await Note.create({ userId: req.user.sub, title: value.title, content: value.content || '' });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// list notes for signed-in user
router.get('/', auth, async (req, res, next) => {
  try {
    const notes = await Note.find({ userId: req.user.sub }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// get one note (must belong to user)
router.get('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'NOT_FOUND' });
    if (note.userId !== req.user.sub) return res.status(401).json({ error: 'UNAUTHORIZED' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// update note (partial)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const { error, value } = updateNoteSchema.validate(req.body, { abortEarly: false });
    if (error) throw error;

    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'NOT_FOUND' });
    if (note.userId !== req.user.sub) return res.status(401).json({ error: 'UNAUTHORIZED' });

    if (value.title !== undefined) note.title = value.title;
    if (value.content !== undefined) note.content = value.content;

    await note.save();
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// delete note
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'NOT_FOUND' });
    if (note.userId !== req.user.sub) return res.status(401).json({ error: 'UNAUTHORIZED' });

    await note.deleteOne();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
