.PHONY: help book clean serve

help:
	@echo "Please use 'make <target>' where <target> is one of:"
	@echo "  book    to convert the `notebooks/` folder into Jekyll markdown in `chapters/`"
	@echo "  clean       to clean out site build files"
	@echo "  runall      to run all notebooks in-place, capturing outputs with the notebook"
	@echo "  serve       to serve the repository locally with Jekyll"

book:
	python scripts/license.py --path ./content
	python scripts/generate_book.py

runall:
	python scripts/execute_all_notebooks.py

clean:
	python scripts/clean.py

serve:
	bundle exec guard

test:
	pytest scripts/teststest_build.py