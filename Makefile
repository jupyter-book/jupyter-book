.PHONY: help textbook clean serve

help:
	@echo "Please use 'make <target>' where <target> is one of:"
	@echo "  textbook    to convert the `notebooks/` folder into Jekyll markdown in `chapters/`"
	@echo "  clean       to clean out site build files"
	@echo "  serve       to serve the repository locally with Jekyll"

textbook:
	python scripts/generate_textbook.py

clean:
	rm -rf _site
	rm -rf _chapters

serve:
	bundle exec jekyll serve
