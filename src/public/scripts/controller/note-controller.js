import NoteService from "../services/note-service.js";
import NoteView from "../note-view.js";
import initialNotes from '../services/data/initialNotes.js';


class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.switchTheme();
        this.view.openCreateNoteHandler();

        this.onNotesChanged(this.model.notes);
        this.view.bindDeleteNote(this.handleDeleteNote);
        this.view.bindCreateNewNote(this.handleAddNote);
        this.view.bindSortByImportance(this.sortByImportance);
        this.view.bindSortByCreated(this.sortByCreated);
        this.view.bindShowFinished(this.filterFinished);
        this.model.bindNotesChanged(this.onNotesChanged);
    }

    onNotesChanged = (notes) => {
        this.view.render(notes);
    }

    handleDeleteNote = (id) => {
        this.model.deleteNote(id);
    }

    handleAddNote = (note) => {
        this.model.addNote(note);
    }

    sortByImportance = () => {
        this.model.sortByImportance();
    }

    sortByCreated = () => {
        this.model.sortByCreated();
    }

    filterFinished = () => {
        this.model.filterFinished();
    }
}

const app = new NoteController(new NoteService(initialNotes), new NoteView());