/*
file: utilities.js
author: Ross McLean
desc: Script contains non-specific functions that can be utilised across the application
 */

function clearList(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

export default clearList;