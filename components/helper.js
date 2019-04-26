
export {progressStyle, allowDrop, drop, selectorFor}

const progressStyle = pct => {
    const red   = "rgba(255,0,0, 0.7)";
    const green = "rgba(115,153,150,0.7)";
    return `background: linear-gradient(90deg, ${red}, ${red} ${pct}%, ${green} ${pct}%, ${green} );`
};

function allowDrop(evt) {
    evt.target.classList.add("drop");
    evt.preventDefault(); // default is not to allow drags.
}

const drop = action => evt => {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("text");
    evt.target.classList.remove("drop");
    action(data, evt.target.id);
};

// adapted from
// https://stackoverflow.com/questions/4588119/get-elements-css-selector-when-it-doesnt-have-an-id
function selectorFor(element) {
    const names = [];
    while (element.parentNode) {
        if (element.id && isNaN(element.id)) { // numbers can be used in ids but they do not work in selectors
            names.unshift('#' + element.id);
            break;
        } else {
            if (element === element.ownerDocument.documentElement) {
                names.unshift(element.tagName);
            } else {
                let count = 1;
                let e = element;
                while (e.previousElementSibling) {
                    e = e.previousElementSibling;
                    count++;
                }
                names.unshift(element.tagName + ":nth-child(" + count + ")");
            }
            element = element.parentNode;
        }
    }
    return names.join(" > ");
}

