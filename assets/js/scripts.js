/**
 * Site-wide JS that sets up:
 *
 * [1] MathJax rendering on navigation
 * [2] Sidebar toggling
 * [3] Sidebar scroll preserving
 * [4] Keyboard navigation
<<<<<<< 774e3b684e529d0788d07cedcc88df407179db17
 * [5] Right sidebar scroll highlighting
=======
 * [5] Copy buttons for code blocks
 * [6] Right sidebar scroll highlighting
 * [7] Add buttons to hide code cells
>>>>>>> adding collapsible code blocks
 */

const togglerId = 'js-sidebar-toggle'
const textbookId = 'js-textbook'
const togglerActiveClass = 'is-active'
const textbookActiveClass = 'js-show-sidebar'
const mathRenderedClass = 'js-mathjax-rendered'
const icon_path = document.location.origin + `${site_basename}assets`;

const getToggler = () => document.getElementById(togglerId)
const getTextbook = () => document.getElementById(textbookId)

// [1] Run MathJax when Turbolinks navigates to a page.
// When Turbolinks caches a page, it also saves the MathJax rendering. We mark
// each page with a CSS class after rendering to prevent double renders when
// navigating back to a cached page.
document.addEventListener('turbolinks:load', () => {
  const textbook = getTextbook()
  if (window.MathJax && !textbook.classList.contains(mathRenderedClass)) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub])
    textbook.classList.add(mathRenderedClass)
  }
})

/**
 * [2] Toggles sidebar and menu icon
 */
const toggleSidebar = () => {
  const toggler = getToggler()
  const textbook = getTextbook()

  if (textbook.classList.contains(textbookActiveClass)) {
    textbook.classList.remove(textbookActiveClass)
    toggler.classList.remove(togglerActiveClass)
  } else {
    textbook.classList.add(textbookActiveClass)
    toggler.classList.add(togglerActiveClass)
  }
}

/**
 * Keep the variable below in sync with the tablet breakpoint value in
 * _sass/inuitcss/tools/_tools.mq.scss
 *
 */
const autoCloseSidebarBreakpoint = 740

// Set up event listener for sidebar toggle button
const sidebarButtonHandler = () => {
  getToggler().addEventListener('click', toggleSidebar)

  /**
   * Auto-close sidebar on smaller screens after page load.
   *
   * Having the sidebar be open by default then closing it on page load for
   * small screens gives the illusion that the sidebar closes in response
   * to selecting a page in the sidebar. However, it does cause a bit of jank
   * on the first page load.
   *
   * Since we don't want to persist state in between page navigation, this is
   * the best we can do while optimizing for larger screens where most
   * viewers will read the textbook.
   *
   * The code below assumes that the sidebar is open by default.
   */
  if (window.innerWidth < autoCloseSidebarBreakpoint) toggleSidebar()
}

initFunction(sidebarButtonHandler);

/**
 * [3] Preserve sidebar scroll when navigating between pages
 */
let sidebarScrollTop = 0
const getSidebar = () => document.getElementById('js-sidebar')

document.addEventListener('turbolinks:before-visit', () => {
  sidebarScrollTop = getSidebar().scrollTop
})

document.addEventListener('turbolinks:load', () => {
  getSidebar().scrollTop = sidebarScrollTop
})

/**
 * Focus textbook page by default so that user can scroll with spacebar
 */
const focusPage = () => {
  document.querySelector('.c-textbook__page').focus()
}

initFunction(focusPage);

/**
 * [4] Use left and right arrow keys to navigate forward and backwards.
 */
const LEFT_ARROW_KEYCODE = 37
const RIGHT_ARROW_KEYCODE = 39

const getPrevUrl = () => document.getElementById('js-page__nav__prev').href
const getNextUrl = () => document.getElementById('js-page__nav__next').href
document.addEventListener('keydown', event => {
  const keycode = event.which

  if (keycode === LEFT_ARROW_KEYCODE) {
    Turbolinks.visit(getPrevUrl())
  } else if (keycode === RIGHT_ARROW_KEYCODE) {
    Turbolinks.visit(getNextUrl())
  }
})

/**
 * [5] Right sidebar scroll highlighting
 */

highlightRightSidebar = function() {
  var position = document.querySelector('.c-textbook__page').scrollTop;
  position = position + (window.innerHeight / 3);  // + Manual offset

  // Highlight the "active" menu item
  document.querySelectorAll('.c-textbook__content h2, .c-textbook__content h3').forEach((header, index) => {
      var target = header.offsetTop;
      var id = header.id;
      if (position >= target) {
        var query = 'ul.toc__menu a[href="#' + id + '"]';
        document.querySelectorAll('ul.toc__menu li').forEach((item) => {item.classList.remove('active')});
        document.querySelectorAll(query).forEach((item) => {item.parentElement.classList.add('active')});
    }
  });
  document.querySelector('.c-textbook__page').addEventListener('scroll', highlightRightSidebar);
};

initFunction(highlightRightSidebar);


/**
 * [6] Add buttons to hide code cells
*/
var toggleCodeCell = function (element) {
    // Figure out if we're a link or an image (fist pageload will be link, clicks will be image)
    if (element.tagName == "A") {
        var link = element;
        var img = element.nextElementSibling;
    } else {
        var link = element.parentElement;
        var img = element;
    };

    // Update the image and class for hidden
    var id = link.getAttribute('data-id');
    var codeCell = document.querySelector(`#${id}`);
    if (codeCell.classList.contains("hidden")) {
        codeCell.classList.remove('hidden');
        img.src = `${icon_path}/minus-circle.svg`;
        link.setAttribute('data-tooltip', "hide code cell");
        
    } else {
        codeCell.classList.add('hidden');
        img.src = `${icon_path}/plus-circle.svg`;
        link.setAttribute('data-tooltip', "show code cell");
    }
}

toggleCodeCellHandler = function (event) {
    toggleCodeCell(event.target)
}


// Initialize the hide buttos
var initCodeCellHandler = function (id) {
    hideLink = document.querySelector(`#${id}`).nextElementSibling;
    hideLink.addEventListener('click', toggleCodeCellHandler)
}

initHiddenCells = function () {
    document.querySelectorAll('div.hidecode pre').forEach(function (item) {
        toggleCodeCell(item.nextElementSibling);
    })
}
const hideCodeButton = id => `<a class="hidebtn o-tooltip--left" data-id="${id}" data-tooltip="hide code cell"><img class="btn o-tooltip--left" src="${icon_path}/minus-circle.svg" alt="Toggle code" /></a>`

addHideButton = function () {
    document.querySelectorAll('pre').forEach(function (item, index) {
        const id = codeCellId(index)
        item.setAttribute('id', id);
        item.insertAdjacentHTML('afterend', hideCodeButton(id))
        initCodeCellHandler(id);
    });

}

initFunction(addHideButton);
initFunction(initHiddenCells);
