// eslint-disable-next-line max-classes-per-file
import createElement from './utils.js';

export default class NoteView {
    constructor() {
        this.app = document.querySelector('main');
        this.notesView = createElement('div', 'notes-view');
        this.createNoteView = createElement('div', 'create-note-container');
        this.app.append(this.notesView, this.createNoteView);
    }

    bindEditHandler(handler) {
        this.editHandler = handler;
    }

    cancelButton() {
        const cancelButton = document.querySelector('#cancel-button');
        cancelButton.addEventListener('click', () => {
            this.notesView.style.display = '';
            this.createNoteView.style.display = 'none';
        });
    }

    bindNoteAction(handlerDelete, handlerGetNote, toggleCompleted) {
        const noteList = document.querySelector('.note-list');
        noteList.addEventListener('click', (e) => {
            if (e.target.className === 'delete-button') {
                // eslint-disable-next-line radix
                const id = parseInt(e.target.parentElement.parentElement.parentElement.id);
                handlerDelete(id);
            }
            if (e.target.className === 'edit-button') {
                e.preventDefault();
                // eslint-disable-next-line radix
                const id = parseInt(e.target.parentElement.parentElement.parentElement.id);
                const editableNote = handlerGetNote(id);
                this.hideNoteView();
                this.renderCreateNewNote(editableNote);
                this.updateNoteHandler(editableNote.id);
                this.cancelButton();
            }
            if (e.target.className === 'checkbox') {
                // eslint-disable-next-line radix
                const id = parseInt(e.target.parentElement.parentElement.parentElement.id);
                toggleCompleted(id);
            }
        });
    }

    bindHeaderTopHandler() {
        const headerTop = document.querySelector('.header-top');
        headerTop.addEventListener('click', (e) => {
            if (e.target.id === 'button-create') {
                this.hideNoteView();
            }
            if (e.target.id === 'theme-button') {
                document.body.classList.toggle('alternative');
            }
        });
    }

    updateNoteHandler(id) {
        this.updateImportanceHandler();
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
            document.querySelector('.create-note').reset();
            document.querySelector('#create-importance').innerHTML = this.createImportanceSVG(2);
            this.notesView.style.display = '';
            this.createNoteView.style.display = 'none';
        });
    }

    bindSaveNewNote(handler) {
        const submitForm = document.querySelector('.create-note');
        submitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                title: document.querySelector('#create-title').value,
                description: document.querySelector('#create-description').value,
                importance: document.querySelector('#create-importance').value,
                date: document.querySelector('#create-date').value,
            };
            handler(data);
            document.querySelector('.create-note').reset();
            document.querySelector('#create-importance').innerHTML = this.createImportanceSVG(2);
            this.notesView.style.display = '';
            this.createNoteView.style.display = 'none';
        }, false);
    }

    updateImportanceHandler() {
        const createImportance = document.querySelector('#create-importance');
        createImportance.addEventListener('click', (e) => {
            createImportance.innerHTML = (this.createImportanceSVG(e.target.dataset.importanceId));
            createImportance.value = e.target.dataset.importanceId;
        });
    }

    bindSortEvents(sortByImportance, sortByCreated, sortByCompleted, filterFinished) {
        const headerSort = document.querySelector('.header-sort');
        headerSort.addEventListener('click', (e) => {
            if (e.target.id === 'sort-importance') {
                sortByImportance();
            }
            if (e.target.id === 'sort-created') {
                sortByCreated();
            }
            if (e.target.id === 'sort-completed') {
                sortByCompleted();
            }
            if (e.target.id === 'show-finished') {
                filterFinished();
            }
        });
    }

    // removeListItems() {
    //     const noteList = document.querySelector('.note-list');
    //     while (noteList.firstChild) {
    //         noteList.removeChild(noteList.firstChild);
    //     }
    // }

    createImportanceSVG(priority) {
        let importanceSVG = '';
        for (let i = 0; i < 5; i++) {
            const svg = `<img src="../assets/bolt.svg" alt="image/svg+xml" data-importance-id="${i + 1}" class="importance-svg ${i < priority ? 'bold' : ''}">`;
            importanceSVG += svg;
        }
        return importanceSVG;
    }

    render(notes) {
        this.renderHeader();
        this.renderNotesView(notes);
        this.renderCreateNewNote();
        this.createNoteView.style.display = 'none';
        this.notesView.style.display = '';
    }

    hideNoteView() {
        this.notesView.style.display = 'none';
        this.createNoteView.style.display = '';
    }

    renderHeader() {
        this.notesView.innerHTML = `
          <div class="header-top">
            <button id="button-create">Create New Note</button>
            <button id="theme-button">BlockWhite-Style</button>
          </div>
          <div class="header-sort">
            <button id="sort-completed"><img src="assets/checkered.svg" alt="finished-date">By finished date</button>
            <button id="sort-created"><img src="assets/created.svg" alt="created-date">By created date</button>
            <button id="sort-importance"><img src="assets/importance.svg" alt="importance-date">By importance</button>
            <button id="show-finished"><img src="assets/done.svg" alt="done">Show finished</button>
          </div>
          <ul class="note-list"></ul>
        `;
    }

    renderNotesView(notes) {
        const noteList = document.querySelector('.note-list');
        // if (noteList.firstChild) this.removeListItems();
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
                <li id="${note.id}" class="note-item">
                    <form class="edit-note">
                        <div class="dueday-container">
                            <label for="dueDay ${note.id}">To be done by: </label>
                            <output id="dueDay ${note.id}" class="due-day">${note.dueDay.weekday}, ${note.dueDay.date}</output>
                        </div>
                        <div class="title-container">
                            <h2>${note.title}</h2>
                            <div class="importance-container">${this.createImportanceSVG(note.importance)}</div>
                        </div>
                        <div class="checkbox-form">
                            <input id="checkbox ${note.id}" class="checkbox" type="checkbox" ${note.complete.done ? 'checked' : ''}>
                            <label class="checkbox-label" for="checkbox ${note.id}">Finished</label>
                        </div>
                        <textarea class="textarea" readonly>${note.description}</textarea>
                        <div class="button-container">
                            <button class="edit-button">Edit</button>
                            <button class="delete-button">Delete</button>
                        </div>
                    </form>
                </li>
                `;
            });
            noteList.innerHTML = noteListItems;
        }
    }

    renderCreateNewNote(editNote) {
        // this.createNoteView.innerHTML = '';
        this.createNoteView.innerHTML = `
        <form class="create-note">
            <div class="form-title-container">
                <label for="create-title">Title</label>
                <input id="create-title" type="text" required value="${editNote && editNote.title ? editNote.title : ''}">
            </div>
            <div class="form-description-container">
                <label for="create-description">Description</label>
                <textarea id="create-description" required>${editNote && editNote.description ? editNote.description : ''}</textarea>     
            </div>
            <div class="form-importance-container">
                <label for="create-importance">Importance</label>
                <div id="create-importance">${this.createImportanceSVG(editNote && editNote.importance ? editNote.importance : 2)}</div>
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
    }
}
