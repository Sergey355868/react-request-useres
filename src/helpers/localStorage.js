export const keys = ["links", "pages", "users"];

export function _localStorage( key, value = null) {
    if (typeof key === "string") {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value));
            return;
        }
        return JSON.parse(localStorage.getItem(key));
    }
}
export function getDataByKey (array_keys) {
   return array_keys.reduce((accum, key) => {
       let value = _localStorage(key);
       if (value) {
           accum[key] = value;
       }
       return accum;
   }, {});
}
//  or rec
export function _getDataByKey(array_keys, accum = {}, index = 0) {
    if (index === array_keys.length) {
       return accum;
    }
    let key = array_keys[index];
    let value  = _localStorage(key);
    if (value) {
        accum[key] = value;
    }
    return  _getDataByKey(array_keys,accum, index +1);
}

export function _localStorageSet(obj) {
    Object.keys(obj).forEach(key => _localStorage(key, obj[key]));
}
