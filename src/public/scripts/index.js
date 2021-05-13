// import bolt from '../assets/bolt.svg';

const initialNotes = [
    {
        id: 1,
        dueDay: 'Wednesday',
        title: 'implement html',
        importance: 1,
        complete: false,
        body: 'test a couple of things',
    },
    {
        id: 2,
        dueDay: 'Monday',
        title: 'implement basic css',
        importance: 5,
        complete: true,
        body: 'test a couple of things',
    },
    {
        id: 3,
        dueDay: 'Thursday',
        title: 'generate notes in js',
        importance: 5,
        complete: false,
        body: 'test a couple of things',
    },
    {
        id: 4,
        dueDay: 'Sunday',
        title: 'implement event/observer functionality',
        importance: 2,
        complete: false,
        body: 'test a couple of things',
    },
    {
        id: 5,
        dueDay: 'Wednesday',
        title: 'clean',
        importance: 3,
        complete: false,
        body: 'test a couple of things',
    },
]

const themeButton = document.getElementById('theme-button');
themeButton.addEventListener('click', () => {
    document.body.classList.toggle('alternative')

})


class NoteModel {
    constructor(initialNotes) {
        this.notes = initialNotes;
    }

    addNote(dueDay, title, importance, body) {
        const newNote = {
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
            dueDay,
            title,
            importance,
            complete: false,
            body,
        };
        this.notes.push(newNote);
    }

    deleteNote = (id) => {
        this.notes = this.notes.filter(note => note.id !== id)
        this.onNotesChanged(this.notes)
    }

    bindNotesChanged(callback) {
        this.onNotesChanged = callback
    }
}

class NoteView {
    constructor() {
        this.app = this.getElement('main');
        this.noteList = this.createElement('ul', 'note-list');
        this.app.append(this.noteList);
    }

    bindDeleteNote(handler) {
        this.noteList.addEventListener('click', event => {
            if (event.target.className === 'delete-button') {
                const id = parseInt(event.target.parentElement.parentElement.id)
                handler(id)
            }
        })
    }

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

    createImportanceSVG(priority) {
        const importanceSVG = this.createElement('div', 'importance-container');
        for (let i = 0; i < priority; i++) {
            const svg = this.createElement('p');
            svg.textContent = '!';
            // svg.src = bolt;
            importanceSVG.append(svg);
        }
        return importanceSVG;
    }

    renderNotes(notes) {
        while (this.noteList.firstChild) {
            this.noteList.removeChild(this.noteList.firstChild);
        }
        if (notes.length === 0) {
            const defaultMessage = this.createElement('p');
            defaultMessage.textContent = 'Create your first note by clicking "Create Note"';
            this.noteList.append(defaultMessage);
        } else {
            notes.forEach((note) => {
                const li = this.createElement('li', 'note-item');
                li.id = note.id;

                const dueDay = this.createElement('p', 'due-day');
                dueDay.textContent = note.dueDay;

                const titleContainer = this.createElement('div', 'title-container');
                const title = this.createElement('h2');
                title.textContent = note.title;
                const importance = this.createImportanceSVG(note.importance);
                titleContainer.append(title, importance);

                const completeContainer = this.createElement('form', 'checkbox-form');
                const completeCheckBox = this.createElement('input', 'checkbox');
                completeCheckBox.type = 'checkbox';
                completeCheckBox.id = 'note-checkbox';
                completeCheckBox.checked = note.complete;
                const completeCheckBoxLabel = this.createElement('label', 'checkbox-label');
                completeCheckBoxLabel.textContent = 'Finished';
                completeCheckBoxLabel.setAttribute('for','note-checkbox');
                completeContainer.append(completeCheckBox, completeCheckBoxLabel);

                const textContent = this.createElement('textarea', 'textarea');
                textContent.textContent = note.body;
                textContent.readOnly = true;

                const buttonContainer = this.createElement('div', 'button-container');
                const editButton = this.createElement('button');
                editButton.textContent = 'Edit';
                buttonContainer.append(editButton)
                const deleteButton = this.createElement('button', 'delete-button');
                deleteButton.textContent = 'Delete';
                buttonContainer.append(deleteButton);


                li.append(dueDay, titleContainer, completeContainer, textContent, buttonContainer);
                this.noteList.append(li);
            });
        }
    }
}

class NoteController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.onNotesChanged(this.model.notes);
        this.view.bindDeleteNote(this.handleDeleteNote)
        this.model.bindNotesChanged(this.onNotesChanged)
    }

    onNotesChanged = (notes) => {
        this.view.renderNotes(notes);
    }

    handleDeleteNote = (id) => {
        this.model.deleteNote(id)
    }
}

const app = new NoteController(new NoteModel(initialNotes), new NoteView())