import httpService from './http-service.js';

class NoteService {

    getNotes() {
        return httpService.ajax('GET', '/notes', undefined);
    }

    async addNote(data) {
        httpService.ajax('POST', '/notes', data);
        this.onNotesChanged(await this.getNotes());
    }

    async getNote(id) {
        return httpService.ajax('GET', `/notes/${id}/`, undefined);
    }

    async deleteNote(id) {
        httpService.ajax('DELETE', `/notes/${id}/`, undefined);
        this.onNotesChanged(await this.getNotes());
    }

    async editNote(editNote) {
        httpService.ajax('PATCH', `/notes/${editNote._id}`, editNote);
        this.onNotesChanged(await this.getNotes());
    }

    async toggleCompleted(id) {
        httpService.ajax('PATCH', `/notes/complete/${id}`, undefined)
            .then(() => this.getNotes())
            .then((res) => this.onNotesChanged(res));
    }

    async sortByImportance() {
        const notes = await httpService.ajax('GET', '/notes', undefined);
        const sortedNotes = notes.sort((a, b) => b.importance - a.importance);
        this.onNotesChanged(sortedNotes);
    }

    async sortByCreated() {
        const notes = await httpService.ajax('GET', '/notes', undefined);
        const sortedNotes = notes.sort((a, b) => Number(b.created) - Number(a.created));
        this.onNotesChanged(sortedNotes);
    }

    async sortByCompleted() {
        const notes = await httpService.ajax('GET', '/notes', undefined);
        const sortedNotes = notes.sort((a, b) => b.complete.timestamp - a.complete.timestamp);
        this.onNotesChanged(sortedNotes);
    }

    async filterFinished() {
        const notes = await httpService.ajax('GET', '/notes', undefined);
        const finishedNotes = notes.filter((note) => note.complete.done);
        this.onNotesChanged(finishedNotes);
    }

    bindNotesChanged(callback) {
        this.onNotesChanged = callback;
    }
}

export default NoteService;
