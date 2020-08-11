# Utterances

Utterances is a commenting engine built on top of GitHub issues. It embeds a comment box in your page that users (with a GitHub account) can use to ask questions. These become comments in a GitHub issue in a repository of your choice.

Utterances is activated on this page. You can see the comment box at the bottom of the page's content. Click the "log in" button and you'll be able to post comments!

## Activate `utteranc.es`

You can activate `utteranc.es` by adding the following to your `conf.py` file:

```yaml
html:
  comments:
    utterances:
      repo: "github-org/github-repo"
      extra: config
```

```{note}
You can pass optional extra configuration for utterances. See
[the utterances documentation for your options](https://utteranc.es/#theme).
```

Next, [follow the `utteranc.es` configuration instructions](https://utteranc.es/#configuration).

When you build your documentation, pages will now have a comment box at the bottom. If readers log in via GitHub they will be able to post comments that will then map onto issues in your GitHub repository.

```{raw} html
<script
   type="text/javascript"
   src="https://utteranc.es/client.js"
   async="async"
   repo="executablebooks/sphinx-comments"
   issue-term="pathname"
   theme="github-light"
   label="ðŸ’¬ comment"
   crossorigin="anonymous"
/>
```
