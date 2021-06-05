import NoteService from "../services/note-service.js";
import NoteView from "../note-view.js";
import initialNotes from '../services/data/initialNotes.js';

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        window.addEventListener('DOMContentLoaded', (event) => {
            this.render(this.model.notes);
            this.onNotesChanged(this.model.notes);

            this.view.bindEditHandler(this.handleEditNote);
            this.view.cancelButton();
            this.view.bindHeaderTopHandler();
            this.view.bindSortEvents(this.sortByImportance, this.sortByCreated, this.sortByCompleted, this.filterFinished)

            this.view.updateImportanceHandler();
            this.view.bindNoteAction(this.handleDeleteNote, this.handleGetNote, this.toggleCompleted);
            this.view.bindSaveNewNote(this.handleAddNote);

            this.model.bindNotesChanged(this.onNotesChanged);
        });
    }

    render = (notes) => {
        this.view.render(notes)
    }

    onNotesChanged = (notes) => {
        // adapt naming
        this.view.renderNotesView(notes);
    }

    handleDeleteNote = (id) => {
        this.model.deleteNote(id);
    }

    handleGetNote = (id) => {
        return this.model.getNote(id);
    }

    toggleCompleted = (id) => {
        this.model.toggleCompleted(id);
    }

    handleAddNote = (note) => {
        this.model.addNote(note);
        // this.view.bindSaveNewNote(this.handleAddNote);
        // this.view.updateImportanceHandler();
    }

    handleEditNote = (note) => {
        this.model.editNote(note);
        this.view.bindEditHandler(this.handleEditNote);
        this.view.updateImportanceHandler();
    }

    sortByImportance = () => {
        this.model.sortByImportance();
    }

    sortByCreated = () => {
        this.model.sortByCreated();
    }

    sortByCompleted = () => {
        this.model.sortByCompleted();
    }

    filterFinished = () => {
        this.model.filterFinished();
    }
}

const app = new NoteController(new NoteService(initialNotes), new NoteView());