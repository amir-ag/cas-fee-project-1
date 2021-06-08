export function createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    return element;
}

export function createImportanceSVG(priority) {
    let importanceSVG = '';
    for (let i = 0; i < 5; i++) {
        const svg = `<img src="../assets/bolt.svg" alt="image/svg+xml" data-importance-id="${i + 1}" class="importance-svg ${i < priority ? 'bold' : ''}">`;
        importanceSVG += svg;
    }
    return importanceSVG;
}

export function createDate(date) {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const splitDate = date.split('-');
    const weekDay = new Date(splitDate[0], (splitDate[1] - 1), splitDate[2]);
    return weekDays[weekDay.getDay()];
}
