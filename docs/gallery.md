# 🖼️ Gallery of Jupyter Books
Jupyter Book technology has been applied across a wide range of use cases, including curricula vitae, official educational textbooks, student portfolios, lab manuals, and technical documentation.
This is a gallery of Jupyter Books built from across the community.
To add your book to this list, [add an entry to this gallery.yml file](https://github.com/jupyter-book/jupyter-book/edit/main/docs/gallery.md) and open a Pull Request.


````{card}
:link: https://mystmd.org/guide
:head: [Myst Official Documentation](https://mystmd.org/guide)
    
```{figure} https://github.com/jupyter-book/workshop-template/blob/main/content/figures/logo.svg
:class: card-img-limit

MyST is an ecosystem of open-source, community-driven tools designed to revolutionize scientific communication. Our powerful authoring framework supports blogs, online books, scientific papers, reports and journals articles.
```
````


% The source for this gallery is at:
%     docs/gallery.yml
% Generate this .txt file by running this command:
%     python docs/src/create_gallery.py
% Or by running the nox build command:
%.    nox -s docs OR nox -s docs-live
```{include} _build/temp/gallery.txt
```
