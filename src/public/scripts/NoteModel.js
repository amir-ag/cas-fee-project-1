export default class NoteModel {
    constructor(initialNotes) {
        this.notes = initialNotes;
    }

    addNote(dueDay=0, title='', importance=1, body='') {
        const newNote = {
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
            dueDay,
            title,
            importance,
            complete: false,
            body,
        };
        this.notes.push(newNote);
        this.onNotesChanged(this.notes);
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id)
        this.onNotesChanged(this.notes);
    }

    sortByImportance() {
        this.notes.sort((a,b) => a.importance - b.importance)
        this.onNotesChanged(this.notes);
    }

    bindNotesChanged(callback) {
        this.onNotesChanged = callback
    }
}

