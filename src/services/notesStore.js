import Datastore from 'nedb-promise';
import {createDate} from '../public/scripts/utils.js';

class Note {
    constructor(note) {
        this.dueDay = {
            weekday: createDate(note.date),
            date: note.date,
        };
        this.title = note.title;
        this.importance = note.importance || 1;
        this.complete = {
            done: false,
            timestamp: 0,
        };
        this.description = note.description;
        this.created = Date.now();
    }
}

class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: 'src/services/data/notes.db', autoload: true});
    }

    all() {
        return this.db.find({});
    }

    add(note) {
        const newNote = new Note(note);
        return this.db.insert(newNote);
    }

    get(id) {
        return this.db.findOne({_id: id});
    }

    update(note) {
        return this.db.update({_id: note.id}, { $set: note });
    }

    delete(id) {
        return this.db.remove({_id: id});
    }

    async complete(id) {
        const note = await this.db.findOne({_id: id});
        const completed = await note.complete.done;
        return this.db.update({_id: id}, {$set: {complete: {done: !completed, timestamp: completed ? null : Date.now()}}});
    }
}

const notesStore = new NotesStore();
export default notesStore;
