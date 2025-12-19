---
title: "Building an 850-page physics demonstration book with Typst and MyST"
date: 2025-10-31
license: CC-BY-4.0
authors:
  - Jupyter Book Team
---

The [TU Delft Demonstration Laboratory](https://contemporary-physicslab.github.io/Demolab/) team built an impressive 850+ page book documenting over 250 physics demonstrations using the [MyST Document Engine](xref:guide) and the new [plain_typst_book template](https://myst-templates.github.io/plain_typst_book/). The pdf serves multiple practical needs: plagiarism scanning, copyright checking, and providing a high-quality PDF alongside their website for reading (which is a common best-practice for multi-page websites).

![Cover of the Demolab physics book](../media/demolab-cover.jpg)

## Website and PDF in one go

It's a good example how the MyST engine can build multiple types of outputs from the same document model.

- Their [website is hosted here](https://contemporary-physicslab.github.io/Demolab/)
- Their [PDF build is here](https://contemporary-physicslab.github.io/Demolab/build/demobook-b34bced182f868f7b8f87d4534e82270.pdf) 
  
And importantly: PDF generation took only seconds, even for this 850+ page document!

They did this by using the [`plain_typst_book` template](https://myst-templates.github.io/plain_typst_book/) which uses [Typst](https://typst.app/), a modern typesetting system that's fast and flexible. 

**Links:**
- [View the Demolab book](https://contemporary-physicslab.github.io/Demolab/)
- [Download the PDF](https://contemporary-physicslab.github.io/Demolab/build/pdf/demobook.pdf)
- [plain_typst_book template](https://myst-templates.github.io/plain_typst_book/)
- [MyST PDF export documentation](https://mystmd.org/guide/creating-pdf-documents)
