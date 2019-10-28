---
jupyter:
  jupytext:
    formats: md
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.1'
      jupytext_version: 1.2.1
  kernelspec:
    display_name: Python 3
    language: python
    name: python3
---

# Automatically building and hosting your book with Netlify

[Netlify](https://www.netlify.com/) is a continuous deployment service that can **automatically build an updated copy of your Jupyter Book** as you push new content.
It can be used across git clients including GitHub, GitLab, and Bitbucket.

Although Netlify has both free and paid tiers, the build process is the same across both.
Importantly, the free tier only allows for 100GB of bandwidth usage per month across all of your Netlify built projects.

If your Jupyter Book will be used by a large audience, or if you're creating many Jupyter Books, you might want to consider registering for [a paid account](https://www.netlify.com/pricing/).
You can also instead automatically build your Jupyter Book with CircleCI, using the configuration shown in the section on [Automatically building, previewing, and pushing your book with CircleCI](https://jupyterbook.org/advanced/circleci.html).

In order to use Netlify, you'll need to [create an account](https://app.netlify.com/signup).
Here, we'll walk through connecting your Jupyter Book to Netlify's continous deployment services using their UI.
You can also check out their [documentation on continuous deployment](https://www.netlify.com/docs/continuous-deployment/).

**Prerequisites**

We assume that you have already [built your book's HTML](book-html.html) and that
your HTML content is in the `_site/` folder. We also assume that you have a
[GitHub repository created for your book](../03_build.html#Create-an-online-repository-for-your-book).

## Step 1: The Netlify site builder

After you've created a Netlify account, you'll need to log in.
The home page will be a dashboard of all sites you're currently building with Netlify.
We can then import a new site by clicking the "New Site from Git" button in the upper right.

This should launch [the site builder](https://app.netlify.com/start):

![Netlify site builder](https://miro.medium.com/max/3413/1*pV0iG0v_6N00_YC07gP7qA.png)

Here, you can select the git client where your Jupyter Book is hosted.
For the purposes of this tutorial, we'll assume that your book is hosted on GitHub.

When you select the "GitHub" option, you'll be asked to grant permission for Netlify to access your GitHub account.
Authorizing access will take you to the next step of the build process, where you can select your Jupyter Book repository.

![Netlify continous deployment](../../images/netlify-cd.png)

Once you've selected the correct repository, you'll need to supply build instructions.
For a standard Jupyter Book, the build instructions should build the book and then serve the resulting HTML with Jekyll.
That is, the *Build command* should be `make site && jekyll build` and the *Publish directory* should be `_site`.

You'll also need to select the appropriate branch to build your repository from.
In this example, we'll use the `master` branch.

![Netlify build command](../../images/netlify-build.png)

<!-- #region {"tags": ["popout"]} -->
**Note**: The default python environment is python 2.7,
which means that some packages may fail to install.
You can update the python environment by supplying a `runtime.txt` file,
as detailed in [the Netlify documentation](https://www.netlify.com/docs/build-settings/#build-environment-variables).
For a full list of available environments,
please see the [Netlify build image details](https://github.com/netlify/build-image/blob/xenial/included_software.md#languages).
<!-- #endregion -->

You can then select *Deploy site* and wait for the site to build.
You'll be re-directed to the site dashboard during the build process.

## Step 2: Updating your domain name

If your site has successfully built, it will be assigned a random domain name.
In order to have a more memorable address, you can update your site's name.

From the site dashboard, select *Domain settings*.
This will take you to a sub-menu, where you can choose to update your site name.

![Netlify configure domain](../../images/netlify-domain.png)

You can enter a memorable, unique name here to describe your Jupyter Book!
Note that it will be prepended to `.netlify.com` so, `MY-BOOK` will become `MY-BOOK.netlify.com`.

You can also use a custom domain (i.e., one that you have purchased through a DNS registrar).
See the [Netlify documentation on custom domains](https://www.netlify.com/docs/custom-domains/) for more details on this process.
