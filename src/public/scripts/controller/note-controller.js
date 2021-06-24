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
        this.view.bindNoteActions(this.handleDeleteNote, this.handleOpenEditNoteView, this.handleToggleCompleted);
        this.view.bindAddNote(this.handleAddNote);
        this.view.headerTopActions(this.handleOpenCreateNoteView, this.handleToggleStyle);
        this.view.bindSortEvents(this.handleSortByImportance, this.handleSortByCreated, this.handleSortByCompleted, this.handleFilterFinished)
        this.view.cancelButton(this.handleHideCreateNoteView);
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

    handleOpenEditNoteView = async (id) => {
        const note = await this.model.getNote(id);
        this.view.createNoteTemplate(note);
        this.view.cancelButton(this.handleHideCreateNoteView);
        this.view.hideNotesView();
    }

    handleOpenCreateNoteView = () => {
        this.view.hideNotesView();
        this.view.createNoteTemplate();
        this.view.cancelButton(this.handleHideCreateNoteView);
        this.view.updateImportanceBar();
    }

    handleHideCreateNoteView = () => {
        this.view.hideCreateNoteView();
        this.view.resetForm();
    }

    handleToggleCompleted = (id) => {
        this.model.toggleCompleted(id);
    }

    handleToggleStyle = () => {
        document.body.classList.toggle('alternative');
    }

    handleAddNote = async (note) => {
        await this.model.addNote(note);
        this.view.resetForm();
        this.view.hideCreateNoteView();
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
