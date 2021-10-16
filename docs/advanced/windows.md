(working-on-windows)=
# Working on Windows

Jupyter Book is now also tested against a Windows environment on Python 3.7 😀

For its specification, see the [`windows-latest` runner](https://docs.github.com/en/actions/reference/virtual-environments-for-github-hosted-runners#supported-runners-and-hardware-resources) used by GitHub CI.

However, there is a known incompatibility for notebook execution, when using Python 3.8
(see this jupyter issue: [jupyter/nbclient#85](https://github.com/jupyter/nbclient/issues/85))

If you're running a recent version of Windows 10 and would like to build with Python 3.8 or encounter issues not covered in the tests, you may also wish to try
[installing Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
