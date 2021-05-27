import Bolt from '../assets/bolt.svg';
// import Eleve from '../assets/eleve.svg';
// eslint-disable-next-line max-classes-per-file

export default class NoteView {
    constructor() {
        this.app = document.querySelector('main');
        this.noteListView = this.createElement('ul', 'note-list');
        this.createNoteView = this.createElement('form', 'create-note');
        this.app.append(this.noteListView, this.createNoteView);
    }

    bindDeleteNote(handler) {
        this.noteListView.addEventListener('click', (event) => {
            if (event.target.className === 'delete-button') {
                // eslint-disable-next-line radix
                const id = parseInt(event.target.parentElement.parentElement.parentElement.id);
                handler(id);
            }
        });
    }

    openCreateNoteHandler() {
        const createNoteButton = document.querySelector('#button-create');
        createNoteButton.addEventListener('click', () => {
            const header = document.querySelector('Header');
            header.style.display = 'none';
            this.noteListView.style.display = 'none';
            this.removeListItems();
            this.createNoteView.style.display = 'flex';
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
        });
    }

    bindSortByImportance(handler) {
        const sortByImportanceButton = document.querySelector('#sort-importance');
        sortByImportanceButton.addEventListener('click', () => {
            handler();
        })
    }

    bindSortByCreated(handler) {
        const sortByCreatedButton = document.querySelector('#sort-created');
        sortByCreatedButton.addEventListener('click', () => {
            handler();
        })
    }

    bindShowFinished(handler) {
        const showFinishedButton = document.querySelector('#show-finished');
        showFinishedButton.addEventListener('click', () => {
            handler();
        })
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
        for (let i = 0; i < priority; i++) {
            const svg = `<object data="${Bolt}" type="image/svg+xml">`;
            // const svg = '!';
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

    renderNoteView(notes) {
        if (this.noteListView.firstChild) this.removeListItems();
        if (notes.length === 0) {
            this.noteListView.innerHTML = `
                <div class="empty-notelist">
                    <h3>Create your first note by clicking "Create new note"!</h3>
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
                            <label class="checkbox-label">
                                <input id="checkbox ${note.id}" type="checkbox" ${note.complete ? "checked" : ""}>
                                Finished
                            </label>
                        </div>
                        <textarea class="textarea" readonly>${note.body}</textarea>
                        <div class="button-container">
                            <button>Edit</button>
                            <button class="delete-button">Delete</button>
                        </div>
                    </form>
                </li>
                `;
                this.noteListView.innerHTML += noteTemplate; //check if refactor necessary
            });
        }
    }

    renderCreateNewNote() {
        const newNoteTemplate = `
        <div class="form-title-container">
            <label for="create-title">Title</label>
            <input id="create-title" type="text">
        </div>
        <div class="form-description-container">
            <label for="create-description">Description</label>
            <textarea id="create-description"></textarea>     
        </div>
        <div class="form-importance-container">
            <label for="create-importance">Importance</label>
            <div id="create-importance">${this.createImportanceSVG(5)}</div>
        </div>
        <div class="form-date-container">
            <label for="create-date">Done by:</label>
            <input id="create-date" type="date">
        </div>
        <button id="save-button">Save</button>
        <div class="cancel-button">
            <button id="cancel-button">Cancel</button>
        </div>
        `;

        if (!this.createNoteView.innerHTML) this.createNoteView.innerHTML += newNoteTemplate;
        this.createNoteView.style.display = '';
    }
}
