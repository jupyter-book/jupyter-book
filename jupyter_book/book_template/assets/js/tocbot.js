const initToc = () => {
  if (window.tocbot === undefined) {
    setTimeout(initToc, 250)
    return
  }

  // Check whether we have any sidebar content. If not, then show the sidebar earlier.
  var SIDEBAR_CONTENT_TAGS = ['.tag_full_width', '.tag_popout'];
  var sidebar_content_query = SIDEBAR_CONTENT_TAGS.join(', ')
  if (document.querySelectorAll(sidebar_content_query).length === 0) {
    document.querySelector('nav.onthispage').classList.add('no_sidebar_content')
  }

  // Initialize the TOC bot
  tocbot.init({
    tocSelector: 'nav.onthispage',
    contentSelector: '.c-textbook__content',
    headingSelector: 'h2, h3',
    orderedList: false,
    collapseDepth: 6,
    listClass: 'toc__menu',
    activeListItemClass: "",  // Not using
    activeLinkClass: "", // Not using
  });
}
initFunction(initToc);