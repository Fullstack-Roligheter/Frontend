let currentPage = 'home';
let listeners = [];

export const changePage = (newPage) => {
    currentPage = newPage;
    for (const listener of listeners) {
        listener(currentPage);
    }
};

export const getCurrentPage = () => currentPage;

export const registerChangeListener = (listener) => {
    listeners.push(listener);
}