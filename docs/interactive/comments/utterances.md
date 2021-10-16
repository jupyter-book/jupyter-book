# Utterances

Utterances is a commenting engine built on top of GitHub Issues. It embeds a comment box in your page that users (with a GitHub account) can use to ask questions. These become comments in a GitHub issue in a repository of your choice.

```{note}
Utterances is activated on this page. You can see the comment box at the bottom of this page's content. Click the "log in" button and you'll be able to post comments!
```

To enable comments using Utterances you need to do the following:

1. Make sure the repository is public, so that others can comment.
2. Install the [utterances app](https://github.com/apps/utterances) on the repo.

## Activate `utteranc.es`


You can activate `utteranc.es` by adding the following to your `_conf.yml` file:

```yaml
html:
  comments:
    utterances:
      repo: "github-org/github-repo"
```

Note that the `utterances` UI will not show up when you are previewing your book locally, it must be hosted somewhere on the web to function.

## Configure `utterances`

You can pass optional extra configuration for utterances. You may do so by providing `key:val` pairs alongside `repo:` in the configuration. See
[the utterances documentation for your options](https://utteranc.es/#configuration).

When you build your documentation, pages will now have a comment box at the bottom. If readers log in via GitHub they will be able to post comments that will then map onto issues in your GitHub repository.

% This HTML activates utterances only on this page
```{raw} html
<script
   type="text/javascript"
   src="https://utteranc.es/client.js"
   async="async"
   repo="executablebooks/jupyter-book"
   issue-term="pathname"
   theme="github-light"
   label="💬 comment"
   crossorigin="anonymous"
/>
```
