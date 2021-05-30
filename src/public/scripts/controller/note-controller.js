import NoteService from "../services/note-service.js";
import NoteView from "../note-view.js";
import initialNotes from '../services/data/initialNotes.js';


class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.onNotesChanged(this.model.notes);
        this.view.switchTheme();
        this.view.openCreateNoteHandler();
        this.view.bindEditHandler(this.handleEditNote)

        this.view.updateImportanceHandler();
        this.view.bindNoteAction(this.handleDeleteNote, this.handleGetNote);
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

    handleGetNote = (id) => {
        return this.model.getNote(id)
    }

    handleAddNote = (note) => {
        this.model.addNote(note);
    }

    handleEditNote = (note) => {
        console.log(note)
        this.model.editNote(note)
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