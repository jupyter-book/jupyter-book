{% if site.use_hide_code_button %}
<script>
/**
Add buttons to hide code cells
*/


var setCodeCellVisibility = function(inputField, kind) {
    // Update the image and class for hidden
    var id = inputField.getAttribute('data-id');
    var codeCell = document.querySelector(`#${id}`);

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
  if (document.querySelector('div.hidecode input') !== null) {
      return;
  }

  // Find the input cells and add a hide button
  document.querySelectorAll('div.input_area div.highlight').forEach(function (item, index) {
    if (!item.parentElement.classList.contains("hidecode")) {
        // Skip the cell if it doesn't have a hidecode class
        return;
    }

    const id = codeCellId(index)
    item.setAttribute('id', id);
    item.insertAdjacentHTML('afterend', hideCodeButton(id))

    // Set up the visibility toggle
    hideLink = document.querySelector(`#${id} + input + label`);
    hideLink.addEventListener('click', toggleCodeCellVisibility)
  });
}


// Initialize the hide buttos
var initHiddenCells = function () {
    // Add hide buttons to the cells
    addHideButton();

    // Toggle the code cells that should be hidden
    document.querySelectorAll('div.hidecode input').forEach(function (item) {
        setCodeCellVisibility(item, 'hidden');
        item.checked = true;
    })
}

initFunction(initHiddenCells);

</script>
{% endif %}