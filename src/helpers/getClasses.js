function _getClasses(_classes, countCall = 0) {
    let classes = [];
    for (let _class of Object.keys(_classes)) {
        let value = _classes[_class];
        if (typeof value ==="boolean" && value) {
            classes.push(_class);
        } else if (isObject(value) && !isEmptyObject(value)) {
            classes.push(_getClasses(value, countCall + 1));
        }
    }
   if (!countCall) {
        return  classes.filter(cl => cl).join(" ");
   }
   return classes.join(" ");
}
function isObject(obj) {
    return (typeof obj ==="object" && obj !== null && !Array.isArray(obj));
}
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export function __getClasses(...args) {
    return args.filter(el => el).map(el => {
        if (typeof el === "string") {
            return el;
        } else if (isObject(el) && !isEmptyObject(el)) {
            return _getClasses(el);
        }
    }).join(" ");
}
