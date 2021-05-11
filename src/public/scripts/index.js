const initialNotes = [
    {
        dueDay: 'Wednesday',
        title: 'implement html',
        importance: 2,
        complete: false,
        body: 'test a couple of things',
    },
    {
        dueDay: 'Monday',
        title: 'implement basic css',
        importance: 2,
        complete: true,
        body: 'test a couple of things',
    },
    {
        dueDay: 'Thursday',
        title: 'generate notes in js',
        importance: 2,
        complete: false,
        body: 'test a couple of things',
    },
    {
        dueDay: 'Sunday',
        title: 'implement event/observer functionality',
        importance: 2,
        complete: false,
        body: 'test a couple of things',
    },
    {
        dueDay: 'Wednesday',
        title: 'clean',
        importance: 2,
        complete: false,
        body: 'test a couple of things',
    },
]

class NoteModel {
    constructor(initialNotes) {
        this.notes = initialNotes;
    }

    addNote(title, body) {
        const newNote = {title, body, complete: false};
        this.notes.push(newNote);
    }
}

class NoteView {
    constructor() {
        this.app = this.getElement('.note-container');
        this.noteList = this.createElement('ul', 'note-list');
        this.app.append(this.noteList);
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
                const dueDay = this.createElement('p', 'due-day');
                const completeContainer = this.createElement('div', 'checkbox-container');
                const completeCheckBox = this.createElement('input', 'checkbox');
                const completeCheckBoxLabel = this.createElement('label', 'checkbox-label');
                const titleContainer = this.createElement('div', 'title-container');
                const title = this.createElement('h1');
                const importance = this.createElement('p', 'importance');
                const textContent = this.createElement('textarea', 'textarea');
                const editButton = this.createElement('button');
                const firstNoteModule = this.createElement('div', 'first-note-module');
                const secondNoteModule = this.createElement('div', 'second-note-module');
                const thirdNoteModule = this.createElement('div', 'third-note-module');
                dueDay.textContent = note.dueDay;
                completeCheckBox.type = 'checkbox';
                completeCheckBox.id = 'note';
                completeCheckBoxLabel.textContent = 'Finished';
                completeCheckBox.htmlFor = 'note';
                completeContainer.append(completeCheckBox);
                completeContainer.append(completeCheckBoxLabel);
                firstNoteModule.append(dueDay, completeContainer);

                title.textContent = note.title;
                importance.textContent = note.importance;
                textContent.textContent = note.body;
                titleContainer.append(title, importance);
                secondNoteModule.append(titleContainer, textContent);

                editButton.textContent = 'Edit';
                thirdNoteModule.append(editButton);
                li.append(firstNoteModule, secondNoteModule, thirdNoteModule);
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
    }

    onNotesChanged(notes) {
        this.view.renderNotes(notes);
    }
}

const app = new NoteController(new NoteModel(initialNotes), new NoteView())