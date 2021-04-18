(working-on-windows)=
# Working on Windows

Jupyter Book is now also tested against a Windows environment on Python 3.7 😀

For its specification, see the [`windows-latest` runner](https://docs.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners#supported-runners-and-hardware-resources) used by GitHub CI.

However, there is a known incompatibility for notebook execution, when using Python 3.8
(see issue [#906](https://github.com/executablebooks/jupyter-book/issues/906)).

If you're running a recent version of Windows 10 and encounter any issues, you may also wish to try
[installing Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

As of June 5, 2020, there were three open issues that required Windows-specific changes.
We hope these are now fixed in version 0.8 of Jupyter Book but, in case any issues still arise,
we leave these community tips, which are known to work for some users.
Note that there is no guarantee that they will work on all Windows installations.

1. Character encoding

    Jupyter Book currently reads and writes files on Windows in the native Windows
    encoding, which causes encoding errors for some characters in UTF8 encoded
    notebooks.

    **Work-around:**  Beginning with
    [Python 3.7](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONUTF8)
    cmd.exe or powershell enviroments that set PYTHONUTF8=1  override the native
    locale encoding and use UTF8 for all input/output.

    :::{tip}
    To make it easier to use this option,
    the EOAS/UBC notebook courseware project has created a Conda package [runjb](https://anaconda.org/eoas_ubc/runjb) which [does this automatically for powershell](https://github.com/eoas-ubc/eoas_tlef/blob/master/converted_docs/wintools/binwin/runjb.ps1)
    :::

2. A new Windows event loop

   The asyncio event loop [has been changed for Python 3.8](https://github.com/sphinx-doc/sphinx/issues/7310)
   causing sphinx-build to fail.

   **Work-around:**  Pin to Python 3.7.6. This
   [environment_win.yml](https://github.com/eoas-ubc/quantecon-mini-example/blob/windows/environment_win.yml)
   file does that, and also installs runjb to fix issue 1.

3. Nested tables of contents

   Currently, `_toc.yml` files that reference Markdown files
   in sub-folders are failing for some Windows users. That is, this
   [original _toc.yml](https://github.com/eoas-ubc/quantecon-mini-example/blob/master/mini_book/_toc.yml)
   file will fail with a message saying Jupyter Book "```cannot find index.md```"

   **Work-around**: Flatten the layout of the book to a single level, i.e.
   [this _toc.yml](https://github.com/eoas-ubc/quantecon-mini-example/blob/windows/mini_book/docs/_toc.yml)
   file works with Windows.

**Summary**

The following workflow should succeed using a miniconda powershell terminal on Windows 10:

1. `conda install git`
2. `git clone https://github.com/eoas-ubc/quantecon-mini-example.git`
3. `cd quantecon-mini-example`
4. `git checkout windows`
5. `conda env create -f environment_win.yml`
6. `conda activate wintest`
7. `cd mini_book`
8. `runjb docs`

After the build, view the HTML with:

`start docs\_build\html\index.html`
