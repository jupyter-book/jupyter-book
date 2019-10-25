// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { bibliography_cite } from './helpers/citation';

const styles = `
d-citation-list {
  contain: style;
}

d-citation-list .references {
  grid-column: text;
}

d-citation-list .references .title {
  font-weight: 500;
}
`;

export function renderCitationList(element, entries, dom = document) {
    if (entries.size > 0) {
        element.style.display = '';
        let list = element.querySelector('.references');
        if (list) {
            list.innerHTML = '';
        } else {
            const stylesTag = dom.createElement('style');
            stylesTag.innerHTML = styles;
            element.appendChild(stylesTag);

            const heading = dom.createElement('h3');
            heading.id = 'references';
            heading.textContent = 'References';
            element.appendChild(heading);

            list = dom.createElement('ol');
            list.id = 'references-list';
            list.className = 'references';
            element.appendChild(list);
        }

        for (const [key, entry] of entries) {
            const listItem = dom.createElement('li');
            listItem.id = key;
            listItem.innerHTML = bibliography_cite(entry);
            list.appendChild(listItem);
        }
    } else {
        element.style.display = 'none';
    }
}

export class CitationList extends HTMLElement {

    static get is() { return 'd-citation-list'; }

    connectedCallback() {
        if (!this.hasAttribute('distill-prerendered')) {
            this.style.display = 'none';
        }
    }

    set citations(citations) {
        renderCitationList(this, citations);
    }

}
