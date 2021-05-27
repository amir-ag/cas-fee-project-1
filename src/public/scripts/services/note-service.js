class NoteService {
    constructor(initialNotes) {
        this.notes = initialNotes;
    }

    createDate(date) {
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const splitDate = date.split('-');
        const dat = new Date(splitDate[0], (splitDate[1] - 1), splitDate[2]);
        return weekDays[dat.getDay()];
    }

    addNote({date = 0, title = '', importance = 1, description = ''}) {
        const newNote = {
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
            dueDay: {weekday: this.createDate(date), date},
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

export default NoteService;
