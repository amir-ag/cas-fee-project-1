import NoteService from "../services/note-service.js";
import NoteView from "../note-view.js";
import initialNotes from '../services/data/initialNotes.js';

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        window.addEventListener('DOMContentLoaded', (event) => {
            this.render(this.model.notes);
            this.view.bindFormActions(this.handleEditNote, this.handleAddNote);
            this.view.bindNoteActions(this.handleDeleteNote, this.handleGetNote, this.handleToggleCompleted);
            this.view.bindAddNote(this.handleAddNote);
            this.view.bindSortEvents(this.handleSortByImportance, this.handleSortByCreated, this.handleSortByCompleted, this.handleFilterFinished)
            this.view.headerTopActions();
            this.view.cancelButton();
            this.view.updateImportanceBar();
            this.model.bindNotesChanged(this.onNotesChanged);
        });
    }

    render = (notes) => {
        this.view.render(notes)
    }

    onNotesChanged = (notes) => {
        this.view.showNotesTemplate(notes);
    }

    handleDeleteNote = (id) => {
        this.model.deleteNote(id);
    }

    handleGetNote = (id) => {
        return this.model.getNote(id);
    }

    handleToggleCompleted = (id) => {
        this.model.toggleCompleted(id);
    }

    handleAddNote = (note) => {
        this.model.addNote(note);
    }

    handleEditNote = (note) => {
        this.model.editNote(note);
        this.view.updateImportanceBar();
    }

    handleSortByImportance = () => {
        this.model.sortByImportance();
    }

    handleSortByCreated = () => {
        this.model.sortByCreated();
    }

    handleSortByCompleted = () => {
        this.model.sortByCompleted();
    }

    handleFilterFinished = () => {
        this.model.filterFinished();
    }
}

const app = new NoteController(new NoteService(initialNotes), new NoteView());
