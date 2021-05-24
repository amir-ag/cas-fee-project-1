// import Bolt from '../assets/bolt.svg';
import NoteModel from './NoteModel.js';

const initialNotes = [
    {
        "id": 1,
        "dueDay": "Wednesday",
        "title":"implement html",
        "importance":1,
        "complete":false,
        "body":"test a couple of things"
    },
    {
        "id":2,
        "dueDay":"Monday",
        "title":"implement basic css",
        "importance":5,
        "complete":true,
        "body":"test a couple of things"
    },
    {
        "id":3,
        "dueDay":"Thursday",
        "title":"generate notes in js",
        "importance":5,
        "complete":false,
        "body":"test a couple of things"
    },
    {
        "id":4,
        "dueDay":"Sunday",
        "title":"implement event/observer functionality",
        "importance":2,
        "complete":false,
        "body":"test a couple of things"
    },
    {
        "id":5,
        "dueDay":"Wednesday",
        "title":"clean",
        "importance":3,
        "complete":false,
        "body":"test a couple of things"
    },
];

const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('alternative')
})

const sortByImportanceButton = document.getElementById('sort-importance');
sortByImportanceButton.addEventListener('click', () => {
    app.model.sortByImportance();
})

const createNote = document.getElementById('button-create');
createNote.addEventListener('click', () => {
    app.view.renderCreateNewNote()
});

class NoteView {
    constructor() {
        this.app = this.getElement('main');
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

    // bindCreateNewNote(handler) {
    //     const saveButton = document.getElementById('save-button');
    //     if (saveButton) {
    //         saveButton.addEventListener('click', () => {
    //             handler(note);
    //         });
    //     }
    // }

    getElement(selector) {
        const element = document.querySelector(selector);
        return element;
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
            // const svg = `<object data=${Bolt} type="image/svg+xml">`
            const svg = '!';
            importanceSVG += svg;
        }
        return importanceSVG;
    }

    renderNoteView(notes) {
        this.app.innerHTML = '';
        this.app.append(this.noteListView);

        if (this.noteListView.firstChild) this.removeListItems();

        if (notes.length === 0) {
            this.noteListView.innerHTML = '<p>Create your first note by clicking "Create new note"!</p>';
        } else {
            notes.forEach((note) => {
                const noteTemplate = `
                <li id="${note.id}" class="note-item">
                    <output class="due-day">${note.dueDay}</output>
                    <div class="title-container">
                        <h2>${note.title}</h2>
                        <div class="importance-container">${this.createImportanceSVG(note.importance)}</div>
                    </div>
                    <form class="checkbox-form">
                        <label class="checkbox-label">
                            <input id="note-checkbox" type="checkbox" ${note.complete ? "checked" : ""}>
                            Finished
                        </label>
                    </form>
                    <textarea class="textarea" readonly>${note.body}</textarea>
                    <div class="button-container">
                        <button>Edit</button>
                        <button class="delete-button">Delete</button>
                    </div>
                </li>
                `;
                this.noteListView.innerHTML += noteTemplate; //check if refactor necessary
            });
        }
    }

    renderCreateNewNote() {
        this.app.innerHTML = '';
        this.app.append(this.createNoteView);
        this.createNoteView.action = './index.js';
        this.createNoteView.method = 'POST';

        const header = document.querySelector('Header');
        header.style.display = 'none';
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
        <button type="submit" id="save-button">Save</button>
        <div class="cancel-button">
            <button id="cancel-button">Cancel</button>
        </div>
        `;

        if (!this.createNoteView.innerHTML) this.createNoteView.innerHTML += newNoteTemplate;

        const saveButton = document.querySelector('#save-button');

        // saveButton.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     console.log('event: ', event);
            // this.app.model.addNote();
            // header.style.display = '';
        // });
    }
}

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.onNotesChanged(this.model.notes);
        this.view.bindDeleteNote(this.handleDeleteNote);
        // this.view.bindCreateNewNote(this.handleAddNote);
        this.model.bindNotesChanged(this.onNotesChanged);
    }

    onNotesChanged(notes) {
        this.view.renderNoteView(notes);
    }

    handleDeleteNote(id) {
        this.model.deleteNote(id);
    }

    // handleAddNote() {
    //     this.model.addNote();
    // }
}

const app = new NoteController(new NoteModel(initialNotes), new NoteView());
