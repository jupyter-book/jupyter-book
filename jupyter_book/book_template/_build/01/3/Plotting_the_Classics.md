---
redirect_from:
  - "/01/3/plotting-the-classics"
interact_link: content/01/3/Plotting_the_Classics.ipynb
kernel_name: python3
title: 'Plotting the Classics'
prev_page:
  url: /01/2/why-data-science
  title: 'Why Data Science?'
next_page:
  url: /01/3/subsection/subsections
  title: 'Subsection Demo 1'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

In this example, we will explore statistics for two classic novels: *The Adventures of Huckleberry Finn* by Mark Twain, and *Little Women* by Louisa May Alcott. The text of any book can be read by a computer at great speed. Books published before 1923 are currently in the *public domain*, meaning that everyone has the right to copy or use the text in any way. [Project Gutenberg](http://www.gutenberg.org/) is a website that publishes public domain books online. Using Python, we can load the text of these books directly from the web.

This example is meant to illustrate some of the broad themes of this text. Don't worry if the details of the program don't yet make sense. Instead, focus on interpreting the images generated below. Later sections of the text will describe most of the features of the Python programming language used below.

First, we read the text of both books into lists of chapters, called `huck_finn_chapters` and `little_women_chapters`. In Python, a name cannot contain any spaces, and so we will often use an underscore `_` to stand in for a space. The `=` in the lines below give a name on the left to the result of some computation described on the right. A *uniform resource locator* or *URL* is an address on the Internet for some content; in this case, the text of a book. The `#` symbol starts a comment, which is ignored by the computer but helpful for people reading the code.



{:.input_area}
```python
# Read two books, fast!

huck_finn_url = 'https://www.inferentialthinking.com/chapters/01/3/huck_finn.txt'
huck_finn_text = read_url(huck_finn_url)
huck_finn_chapters = huck_finn_text.split('CHAPTER ')[44:]

little_women_url = 'https://www.inferentialthinking.com/chapters/01/3/little_women.txt'
little_women_text = read_url(little_women_url)
little_women_chapters = little_women_text.split('CHAPTER ')[1:]
```


While a computer cannot understand the text of a book, it can provide us with some insight into the structure of the text. The name `huck_finn_chapters` is currently bound to a list of all the chapters in the book. We can place them into a table to see how each chapter begins.



{:.input_area}
```python
# Display the chapters of Huckleberry Finn in a table.

Table().with_column('Chapters', huck_finn_chapters)
```





<div markdown="0" class="output output_html">
<table border="1" class="dataframe">
    <thead>
        <tr>
            <th>Chapters</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>I. YOU don't know about me without you have read a book  ...</td>
        </tr>
        <tr>
            <td>II. WE went tiptoeing along a path amongst the trees bac ...</td>
        </tr>
        <tr>
            <td>III. WELL, I got a good going-over in the morning from o ...</td>
        </tr>
        <tr>
            <td>IV. WELL, three or four months run along, and it was wel ...</td>
        </tr>
        <tr>
            <td>V. I had shut the door to. Then I turned around and ther ...</td>
        </tr>
        <tr>
            <td>VI. WELL, pretty soon the old man was up and around agai ...</td>
        </tr>
        <tr>
            <td>VII. "GIT up! What you 'bout?" I opened my eyes and look ...</td>
        </tr>
        <tr>
            <td>VIII. THE sun was up so high when I waked that I judged  ...</td>
        </tr>
        <tr>
            <td>IX. I wanted to go and look at a place right about the m ...</td>
        </tr>
        <tr>
            <td>X. AFTER breakfast I wanted to talk about the dead man a ...</td>
        </tr>
    </tbody>
</table>
<p>... (33 rows omitted)</p>
</div>



Each chapter begins with a chapter number in Roman numerals, followed by the first sentence of the chapter. Project Gutenberg has printed the first word of each chapter in upper case. 
