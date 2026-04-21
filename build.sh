#!/usr/bin/env sh
set -eu

mkdir -p dist

CHAPTERS="\
src/00-intro.md \
src/01-why.md \
src/02-principles.md \
src/03-3sentences.md \
src/04-structure.md \
src/05-precision.md \
src/06-example.md \
src/07-audience.md \
src/08-mistakes.md \
src/09-scenarios.md \
src/10-advanced.md"

cp style.css dist/style.css

pandoc metadata.yaml $CHAPTERS -o dist/book.epub --css=style.css
pandoc metadata.yaml $CHAPTERS -o dist/index.html --css=style.css --standalone --toc
