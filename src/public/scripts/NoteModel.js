export default class NoteModel {
    constructor(initialNotes) {
        this.notes = initialNotes;
    }

    addNote({date = 0, title = '', importance = 1, description = ''}) {
        const newNote = {
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
            dueDay: date,
            title,
            importance,
            complete: false,
            body: description,
            created: Date.now(),
        };
        this.notes.push(newNote);
        this.onNotesChanged(this.notes);
    }

    deleteNote(id) {
        this.notes = this.notes.filter((note) => note.id !== id);
        this.onNotesChanged(this.notes);
    }

    sortByImportance() {
        this.notes.sort((a, b) => a.importance - b.importance);
        this.onNotesChanged(this.notes);
    }

    sortByCreated() {
        this.notes.sort((a, b) => Number(b.created) - Number(a.created));
        this.onNotesChanged(this.notes);
    }

    filterFinished() {
        const finishedNotes = this.notes.filter((note) => note.complete);
        this.onNotesChanged(finishedNotes);
    }

    bindNotesChanged(callback) {
        this.onNotesChanged = callback;
    }
}
