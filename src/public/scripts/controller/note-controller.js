import NoteService from "../services/note-service.js";
import NoteView from "../note-view.js";
import initialNotes from '../services/data/initialNotes.js';


class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        window.addEventListener('DOMContentLoaded', (event) => {
            this.onNotesChanged(this.model.notes);
            this.view.switchTheme();
            this.view.openCreateNoteHandler();
            this.view.cancelButton(this.renderNoteView);
            this.view.bindEditHandler(this.handleEditNote)

            this.view.updateImportanceHandler();
            this.view.bindNoteAction(this.handleDeleteNote, this.handleGetNote, this.toggleCompleted);
            this.view.bindCreateNewNote(this.handleAddNote);
            this.view.bindSortByImportance(this.sortByImportance);
            this.view.bindSortByCreated(this.sortByCreated);
            this.view.bindShowFinished(this.filterFinished);
            this.model.bindNotesChanged(this.onNotesChanged);
        });
    }

    renderNoteView = () => {
        this.model.returnNotes();
        this.view.bindEditHandler(this.renderNoteView)
    }

    onNotesChanged = (notes) => {
        this.view.render(notes);
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
        this.view.bindCreateNewNote(this.handleAddNote);
        this.view.updateImportanceHandler();
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

    filterFinished = () => {
        this.model.filterFinished();
    }
}

const app = new NoteController(new NoteService(initialNotes), new NoteView());