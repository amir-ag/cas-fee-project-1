// eslint-disable-next-line max-classes-per-file

export default class NoteView {
    constructor() {
        this.app = document.querySelector('main');
        this.noteListView = this.createElement('ul', 'note-list');
        this.createNoteView = this.createElement('form', 'create-note');
        this.app.append(this.noteListView, this.createNoteView);
    }

    bindEditHandler(handler) {
        this.editHandler = handler;
    }

    cancelButton(handler) {
        const cancelButton = document.querySelector('#cancel-button');
        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            handler();
        });
    }

    bindNoteAction(handlerDelete, handlerGetNote, toggleCompleted) {
        this.noteListView.addEventListener('click', (e) => {
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
            }
            if (e.target.className === 'checkbox') {
                // eslint-disable-next-line radix
                const id = parseInt(e.target.parentElement.parentElement.parentElement.id);
                toggleCompleted(id);
            }
        });
    }

    openCreateNoteHandler() {
        const createNoteButton = document.querySelector('#button-create');
        createNoteButton.addEventListener('click', () => {
            this.hideNoteView();
        });
    }

    updateNoteHandler(id) {
        this.updateImportanceHandler();
        const saveButton = document.querySelector('#save-button-edit');
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();
            const updatedData = {
                id,
                title: document.querySelector('#create-title').value,
                description: document.querySelector('#create-description').value,
                importance: document.querySelector('#create-importance').value,
                date: document.querySelector('#create-date').value,
            };
            this.editHandler(updatedData);
        });
    }

    updateImportanceHandler() {
        const createImportance = document.querySelector('#create-importance');
        createImportance.addEventListener('click', (e) => {
            createImportance.innerHTML = (this.createImportanceSVG(e.target.dataset.importanceId));
            createImportance.value = e.target.dataset.importanceId;
        });
    }

    bindCreateNewNote(handler) {
        const saveButton = document.getElementById('save-button');
        saveButton.addEventListener('click', (e) => {
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
        });
    }

    bindSortByImportance(handler) {
        const sortByImportanceButton = document.querySelector('#sort-importance');
        sortByImportanceButton.addEventListener('click', () => {
            handler();
        });
    }

    bindSortByCreated(handler) {
        const sortByCreatedButton = document.querySelector('#sort-created');
        sortByCreatedButton.addEventListener('click', () => {
            handler();
        });
    }

    bindShowFinished(handler) {
        const showFinishedButton = document.querySelector('#show-finished');
        showFinishedButton.addEventListener('click', () => {
            handler();
        });
    }

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    }

    removeListItems() {
        while (this.noteListView.firstChild) {
            this.noteListView.removeChild(this.noteListView.firstChild);
        }
    }

    createImportanceSVG(priority) {
        let importanceSVG = '';
        for (let i = 0; i < 5; i++) {
            const svg = `<img src="../assets/bolt.svg" alt="image/svg+xml" data-importance-id="${i + 1}" class="importance-svg ${i < priority ? 'bold' : ''}">`;
            importanceSVG += svg;
        }
        return importanceSVG;
    }

    switchTheme() {
        const themeButton = document.querySelector('#theme-button');
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('alternative');
        });
    }

    render(notes) {
        this.app.innerHTML = '';
        this.renderNoteView(notes);
        this.renderCreateNewNote();
        this.app.append(this.noteListView);
        this.app.append(this.createNoteView);
        this.createNoteView.style.display = 'none';
        const header = document.querySelector('Header');
        header.style.display = '';
        this.noteListView.style.display = '';
    }

    hideNoteView() {
        const header = document.querySelector('Header');
        header.style.display = 'none';
        this.noteListView.style.display = 'none';
        this.removeListItems();
        this.createNoteView.style.display = '';
    }

    renderNoteView(notes) {
        if (this.noteListView.firstChild) this.removeListItems();
        if (notes.length === 0) {
            this.noteListView.innerHTML = `
                <div class="empty-notelist">
                    <h3>Create your first note by clicking "Create new note"!</h3>
                    <img src="../assets/eleve.svg" alt="empty-desk" width="200px" height="200px"/>
                </div>`;
        } else {
            notes.forEach((note) => {
                const noteTemplate = `
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
                            <input id="checkbox ${note.id}" class="checkbox" type="checkbox" ${note.complete ? 'checked' : ''}>
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
                this.noteListView.innerHTML += noteTemplate;
            });
        }
    }

    renderCreateNewNote(editNote) {
        this.createNoteView.innerHTML = '';
        const newNoteTemplate = `
        <div class="form-title-container">
            <label for="create-title">Title</label>
            <input id="create-title" type="text" value="${editNote && editNote.title ? editNote.title : ''}">
        </div>
        <div class="form-description-container">
            <label for="create-description">Description</label>
            <textarea id="create-description">${editNote && editNote.description ? editNote.description : ''}</textarea>     
        </div>
        <div class="form-importance-container">
            <label for="create-importance">Importance</label>
            <div id="create-importance">${this.createImportanceSVG(editNote && editNote.importance ? editNote.importance : 2)}</div>
        </div>
        <div class="form-date-container">
            <label for="create-date">Done by:</label>
            <input id="create-date" type="date" value="${editNote && editNote.dueDay.date ? editNote.dueDay.date : ''}">
        </div>
        <button id="save-button${editNote ? '-edit' : ''}" class="save-button" >Save</button>
        <div class="cancel-button">
            <button id="cancel-button">Cancel</button>
        </div>
        `;

        // if (!this.createNoteView.innerHTML) this.createNoteView.innerHTML += newNoteTemplate;
        this.createNoteView.innerHTML = newNoteTemplate;
        this.createNoteView.style.display = '';
    }
}
