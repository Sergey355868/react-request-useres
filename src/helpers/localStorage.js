export function _localStorage( key, value = null) {
    if (typeof key === "string") {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
            return;
        }
        return JSON.parse(localStorage.getItem(key));
    }
}
export function _localStorageSet(obj) {
    Object.keys(obj).forEach(key => _localStorage(key, obj[key]));
}
