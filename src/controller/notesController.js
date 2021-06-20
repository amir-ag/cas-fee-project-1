import notesStore from '../services/notesStore.js';

class NotesController {
    async getNotes(req, res) {
        res.json(await notesStore.all() || []);
    }

    async createNote(req, res) {
        res.json(await notesStore.add(req.body));
    }

    async getNote(req, res) {
        res.json(await notesStore.get(req.params.id));
    }

    async editNote(req, res) {
        res.json(await notesStore.update(req.body));
    }

    async deleteNote(req, res) {
        res.json(await notesStore.delete(req.params.id));
    }

    async completedNote(req, res) {
        res.json(await notesStore.complete(req.params.id));
    }
}

const notesController = new NotesController();
export default notesController;
