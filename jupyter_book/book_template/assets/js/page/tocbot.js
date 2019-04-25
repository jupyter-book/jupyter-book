var initToc = function () {
  tocbot.init({
    tocSelector: 'nav.onthispage',
    contentSelector: 'div.inner_cell',
    headingSelector: 'h2, h3',
    orderedList: false,
    collapseDepth: 6,
    listClass: 'toc__menu',
    activeListItemClass: "",  // Not using
    activeLinkClass: "", // Not using
  });
  tocbot.refresh();
}
initFunction(initToc);
