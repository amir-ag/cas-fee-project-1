import {createElement, createImportanceSVG, getRandomColor} from './utils.js';

export default class NoteView {
    constructor() {
        this.app = document.querySelector('main');
        this.notesView = createElement('div', 'notes-view');
        this.createNoteView = createElement('div', 'create-note-container');
        this.app.append(this.notesView, this.createNoteView);
    }

    bindFormActions(editHandler, addHandler) {
        this.editHandler = editHandler;
        this.addHandler = addHandler;
    }

    bindNoteActions(handleDelete, handleGetNote, handleToggleCompleted) {
        const noteList = document.querySelector('.note-list');
        noteList.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.className === 'delete-button') {
                const {id} = e.target.parentElement.parentElement.parentElement;
                handleDelete(id);
            }
            if (e.target.className === 'edit-button') {
                const {id} = e.target.parentElement.parentElement.parentElement;
                handleGetNote(id)
                    .then((res) => {
                        this.createNoteTemplate(res);
                    });
                this.cancelButton();
                this.hideNotesView();
            }
            if (e.target.className === 'checkbox') {
                const {id} = e.target.parentElement.parentElement.parentElement;
                handleToggleCompleted(id);
            }
        });
    }

    bindAddNote(handler) {
        const submitForm = document.querySelector('.create-note');
        submitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                title: document.querySelector('#create-title').value,
                description: document.querySelector('#create-description').value,
                importance: document.querySelector('#create-importance').value,
                date: document.querySelector('#create-date').value,
                color: document.querySelector('#create-title').className,
            };
            handler(data);
            this.resetForm();
            this.hideCreateNoteView();
        });
    }

    bindSortEvents(handleSortByImportance, handleSortByCreated, handleSortByCompleted, handleFilterFinished) {
        const headerSort = document.querySelector('.header-sort');
        headerSort.addEventListener('click', (e) => {
            if (e.target.id === 'sort-importance') {
                handleSortByImportance();
            }
            if (e.target.id === 'sort-created') {
                handleSortByCreated();
            }
            if (e.target.id === 'sort-completed') {
                handleSortByCompleted();
            }
            if (e.target.id === 'show-finished') {
                handleFilterFinished();
            }
        });
    }

    headerTopActions() {
        const headerTop = document.querySelector('.header-top');
        headerTop.addEventListener('click', (e) => {
            if (e.target.id === 'button-create') {
                this.hideNotesView();
                this.createNoteTemplate();
            }
            if (e.target.id === 'theme-button') {
                document.body.classList.toggle('alternative');
            }
        });
    }

    cancelButton() {
        const cancelButton = document.querySelector('#cancel-button');
        cancelButton.addEventListener('click', () => {
            this.hideCreateNoteView();
            this.resetForm();
        });
    }

    updateImportanceBar() {
        const createImportance = document.querySelector('#create-importance');
        createImportance.addEventListener('click', (e) => {
            createImportance.innerHTML = (createImportanceSVG(e.target.dataset.importanceId));
            createImportance.value = e.target.dataset.importanceId;
        });
    }

    updateNote(id) {
        this.updateImportanceBar();
        const submitForm = document.querySelector('.create-note');
        submitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedData = {
                id,
                title: document.querySelector('#create-title').value,
                description: document.querySelector('#create-description').value,
                importance: document.querySelector('#create-importance').value,
                date: document.querySelector('#create-date').value,
            };
            this.editHandler(updatedData);
            this.resetForm();
            this.hideCreateNoteView();
        });
    }

    resetForm() {
        document.querySelector('.create-note').reset();
        document.querySelector('#create-importance').innerHTML = createImportanceSVG(2);
    }

    hideCreateNoteView() {
        this.notesView.style.display = '';
        this.createNoteView.style.display = 'none';
    }

    hideNotesView() {
        this.createNoteView.style.display = '';
        this.notesView.style.display = 'none';
    }

    headerTemplate() {
        this.notesView.innerHTML = `
          <div class="header-top">
            <button id="button-create">Create New Note</button>
            <button id="theme-button">BlockWhite-Style</button>
          </div>
          <div class="header-sort">
            <button id="sort-completed"><img src="../assets/checkered.svg" alt="finished-date">By finished date</button>
            <button id="sort-created"><img src="../assets/created.svg" alt="created-date">By created date</button>
            <button id="sort-importance"><img src="../assets/importance.svg" alt="importance-date">By importance</button>
            <button id="show-finished"><img src="../assets/done.svg" alt="done">Show finished</button>
          </div>
          <ul class="note-list"></ul>
        `;
    }

    showNotesTemplate(notes) {
        const noteList = document.querySelector('.note-list');
        if (notes.length === 0) {
            noteList.innerHTML = `
                <li class="empty-notelist">
                    <h3>Create your first note by clicking "Create new note"!</h3>
                    <img src="../assets/eleve.svg" alt="empty-desk" width="200px" height="200px"/>
                </li>`;
        } else {
            let noteListItems = '';
            notes.forEach((note) => {
                noteListItems += `
                <li id="${note._id}" class="note-item">
                    <form class="edit-note">
                        <div class="dueday-container">
                            <label for="dueDay ${note._id}">Get it done by: </label>
                            <output id="dueDay ${note._id}" class="due-day">${note.dueDay.weekday}, ${note.dueDay.date}</output>
                        </div>
                        <div class="title-container ${note.color}">
                            <h2>${note.title}</h2>
                            <div class="importance-container">${createImportanceSVG(note.importance)}</div>
                        </div>
                        <div class="checkbox-form">
                            <input id="checkbox ${note._id}" class="checkbox" type="checkbox" ${note.complete.done ? 'checked' : ''}>
                            <label class="checkbox-label" for="checkbox ${note._id}">Finished</label>
                        </div>
                        <div class="textarea ${note.color}">${note.description}</div>
                        <div class="button-container">
                            <button class="edit-button">
                                <img src="../assets/edit.svg" alt="edit"/>
                                <p>Edit</p>
                            </button>
                            <button class="delete-button">
                                <img src="../assets/delete.svg" alt="delete"/>
                                <p>Delete</p>
                            </button>
                        </div>
                    </form>
                </li>
                `;
            });
            noteList.innerHTML = noteListItems;
        }
    }

    createNoteTemplate(editNote) {
        const color = editNote ? editNote.color : getRandomColor();
        this.createNoteView.innerHTML = `
        <form class="create-note">
            <div class="form-content-container">
                <div class="form-content-labels">
                    <label for="create-title">Title</label>
                    <label for="create-description">Description</label>
                </div>
                <div class="form-content">
                    <input id="create-title" class="${color}" type="text" required value="${editNote && editNote.title ? editNote.title : ''}">
                    <textarea id="create-description" class=${color} required>${editNote && editNote.description ? editNote.description : ''}</textarea>    
                </div>
            </div>
            <div class="form-importance-container">
                <label for="create-importance">Importance</label>
                <div id="create-importance">${createImportanceSVG(editNote && editNote.importance ? editNote.importance : 2)}</div>
            </div>
            <div class="form-date-container">
                <label for="create-date">Done by:</label>
                <input id="create-date" type="date" required value="${editNote && editNote.dueDay.date ? editNote.dueDay.date : ''}">
            </div>
            <button type="submit" id="save-button${editNote ? '-edit' : ''}" class="save-button">Save</button>
            <div class="cancel-button">
                <button type="button" id="cancel-button">Cancel</button>
            </div>
        </form>
        `;
        this.cancelButton();
        this.updateImportanceBar();
        editNote ? this.updateNote(editNote._id) : this.bindAddNote(this.addHandler);
    }

    render(notes) {
        this.headerTemplate();
        this.showNotesTemplate(notes);
        this.createNoteTemplate();
        this.hideCreateNoteView();
    }
}
