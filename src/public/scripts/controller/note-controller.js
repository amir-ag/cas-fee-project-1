import NoteService from "../services/note-service.js";
import NoteView from "../note-view.js";

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.render();
        this.model.bindNotesChanged(this.onNotesChanged);
    }

    init() {
        this.view.bindFormActions(this.handleEditNote, this.handleAddNote);
        this.view.bindNoteActions(this.handleDeleteNote, this.handleGetNote, this.handleToggleCompleted);
        this.view.bindAddNote(this.handleAddNote);
        this.view.bindSortEvents(this.handleSortByImportance, this.handleSortByCreated, this.handleSortByCompleted, this.handleFilterFinished)
        this.view.headerTopActions();
        this.view.cancelButton();
        this.view.updateImportanceBar();
    }

    render = async () => {
        const notes = await this.model.getNotes()
        this.view.render(notes);
        this.init();
    }

    onNotesChanged = (notes) => {
        this.view.showNotesTemplate(notes);
    }

    handleDeleteNote = (id) => {
        this.model.deleteNote(id);
    }

    handleGetNote = async (id) => {
        return await this.model.getNote(id);
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

const app = new NoteController(new NoteService(), new NoteView());
