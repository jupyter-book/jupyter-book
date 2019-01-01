Once you've generated the markdown for your notebooks, your site is ready to be
pushed and served by GitHub. To do this, take the following steps:

0. Confirm that your site files are built. You should see a
   collection of markdown files/folders in the `_build` folder,
   or a collection of HTML in your `_site/` folder.
1. Commit and push the changes to your repository. 
2. Enable GitHub site building for your repository.

   From your GitHub repository, click `Settings` then scroll down to the
   `GitHub Pages` section. You should see the message `Your site is published at <YOUR-URL>`.
   Ensure that you're building from the correct folder.
   
3. Go to the URL listed at `<YOUR-URL>` and you should see your live site.

## To preview your built site locally

You can also preview your built site using Jekyll on your computer.
To do this, you must take the following steps:

1. Ensure that Jekyll and Ruby are installed. 
2. Ensure that your notebooks have been converted to markdown, there should be a
   collection of them in `_build/`
3. Run the Jekyll site preview command:

       make serve

This should open up a port on your computer with a live version of the book.