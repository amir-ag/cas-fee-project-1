// import Bolt from '../assets/bolt.svg';
// eslint-disable-next-line max-classes-per-file
import NoteModel from './NoteModel.js';

const initialNotes = [
    {
        "id": 1,
        "dueDay": {
            "weekday": "Monday",
            "date": "2021-06-25",
        },
        "title":"implement html",
        "importance":1,
        "complete":false,
        "body":"test a couple of things",
        "created":"1620743338",
    },
    {
        "id":2,
        "dueDay": {
            "weekday": "Tuesday",
            "date": "2021-06-24",
        },
        "title":"implement basic css",
        "importance":5,
        "complete":true,
        "body":"test a couple of things",
        "created":"1620829738",

    },
    {
        "id":3,
        "dueDay": {
            "weekday": "Thursday",
            "date": "2021-06-30",
        },
        "title":"generate notes in js",
        "importance":5,
        "complete":false,
        "body":"test a couple of things",
        "created":"1620916138",
    },
    {
        "id":4,
        "dueDay": {
            "weekday": "Sunday",
            "date": "2021-06-15",
        },
        "title":"implement event/observer functionality",
        "importance":2,
        "complete":false,
        "body":"test a couple of things",
        "created":"1621002538",
    },
    {
        "id":5,
        "dueDay": {
            "weekday": "Saturday",
            "date": "2021-06-1",
        },
        "title":"clean",
        "importance":3,
        "complete":true,
        "body":"test a couple of things",
        "created":"1621088938",
    },
];

class NoteView {
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
                const id = parseInt(event.target.parentElement.parentElement.id);
                handler(id);
            }
        });
    }

    openCreateNoteHandler() {
        const createNoteButton = document.querySelector('#button-create');
        createNoteButton.addEventListener('click', () => {
            const header = document.querySelector('Header');
            header.style.display = 'none';
            app.view.noteListView.style.display = 'none';
            app.view.removeListItems();
            app.view.createNoteView.style.display = 'flex';
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
            console.log('data: ', data)
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
            // const svg = `<object data="../assets/bolt.svg" type="image/svg+xml">`
            const svg = '!';
            importanceSVG += svg;
        }
        return importanceSVG;
    }

    switchTheme() {
        const themeButton = document.querySelector('#theme-button');
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('alternative')
        })
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
            this.noteListView.innerHTML = '<p>Create your first note by clicking "Create new note"!</p>';
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

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.switchTheme();
        this.view.openCreateNoteHandler();

        this.onNotesChanged(this.model.notes);
        this.view.bindDeleteNote(this.handleDeleteNote);
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

    handleAddNote = (note) => {
        this.model.addNote(note);
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

const app = new NoteController(new NoteModel(initialNotes), new NoteView());
