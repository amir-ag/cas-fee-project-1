import express from 'express';
import notesController from '../controller/notesController.js';

const router = express.Router();

router.get('/', notesController.getNotes.bind(notesController));
router.post('/', notesController.createNote.bind(notesController));

router.get('/:id', notesController.getNote.bind(notesController));
router.patch('/:id', notesController.editNote.bind(notesController));
router.delete('/:id/', notesController.deleteNote.bind(notesController));

router.patch('/complete/:id', notesController.completedNote.bind(notesController));

const noteRoutes = router;
export default noteRoutes;
