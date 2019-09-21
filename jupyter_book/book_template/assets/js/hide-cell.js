/**
  Add buttons to hide code cells
*/
var setCodeCellVisibility = function (inputField, kind) {
    // Update the image and class for hidden
    var id = inputField.getAttribute('data-id');
    var codeCell = document.querySelector(`#${id} div.highlight`);

    if (kind === "visible") {
        codeCell.classList.remove('hidden');
        inputField.checked = true;
    } else {
        codeCell.classList.add('hidden');
        inputField.checked = false;
    }
}

var toggleCodeCellVisibility = function (event) {
    // The label is clicked, and now we decide what to do based on the input field's clicked status
    if (event.target.tagName === "LABEL") {
        var inputField = event.target.previousElementSibling;
    } else {
        // It is the span inside the target
        var inputField = event.target.parentElement.previousElementSibling;
    }

    if (inputField.checked === true) {
        setCodeCellVisibility(inputField, "visible");
    } else {
        setCodeCellVisibility(inputField, "hidden");
    }
}


// Button constructor
const hideCodeButton = id => `<input class="hidebtn" type="checkbox" id="hidebtn${id}" data-id="${id}"><label title="Toggle cell" for="hidebtn${id}" class="plusminus"><span class="pm_h"></span><span class="pm_v"></span></label>`

var addHideButton = function () {
    // If a hide button is already added, don't add another
    if (document.querySelector('div.tag_hide_input input') !== null) {
        return;
    }

    // Find the input cells and add a hide button
    pageElements['inputCells'].forEach(function (inputCell) {
        if (!inputCell.classList.contains("tag_hide_input")) {
            // Skip the cell if it doesn't have a hidecode class
            return;
        }

        const id = inputCell.getAttribute('id')

        // Insert the button just inside the end of the next div
        inputCell.querySelector('div.input').insertAdjacentHTML('beforeend', hideCodeButton(id))

        // Set up the visibility toggle
        hideLink = document.querySelector(`#${id} div.inner_cell + input + label`);
        hideLink.addEventListener('click', toggleCodeCellVisibility)
    });
}


// Initialize the hide buttos
var initHiddenCells = function () {
    // Add hide buttons to the cells
    addHideButton();

    // Toggle the code cells that should be hidden
    document.querySelectorAll('div.tag_hide_input input').forEach(function (item) {
        setCodeCellVisibility(item, 'hidden');
        item.checked = true;
    })
}

initFunction(initHiddenCells);