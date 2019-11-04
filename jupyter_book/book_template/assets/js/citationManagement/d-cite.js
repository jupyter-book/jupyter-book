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

import { Template } from './d-template';
import { hover_cite, bibliography_cite } from './helpers/citation';

const T = Template('d-cite', `
<style>

:host {
  display: inline-block;
}

.citation {
  color: hsla(206, 90%, 20%, 0.7);
}

.citation-number {
  cursor: default;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", Helvetica, sans-serif;
  font-size: 75%;
  color: hsla(206, 90%, 20%, 0.7);
  display: inline-block;
  line-height: 1.1em;
  text-align: center;
  position: relative;
  top: -2px;
  margin: 0 2px;
}

figcaption .citation-number {
  font-size: 11px;
  font-weight: normal;
  top: -2px;
  line-height: 1em;
}

</style>

<d-hover-box id="hover-box"></d-hover-box>

<div id="citation-" class="citation">
  <span class="citation-number"></span>
</div>
`);

export class Cite extends T(HTMLElement) {

    /* Lifecycle */
    constructor() {
        super();
        this._numbers = [];
        this._entries = [];
    }

    connectedCallback() {
        this.outerSpan = this.root.querySelector('#citation-');
        this.innerSpan = this.root.querySelector('.citation-number');
        this.hoverBox = this.root.querySelector('d-hover-box');
        window.customElements.whenDefined('d-hover-box').then(() => {
            this.hoverBox.listen(this);
        });
        // in case this component got connected after values were set
        if (this.numbers) {
            this.displayNumbers(this.numbers)
        }
        if (this.entries) {
            this.displayEntries(this.entries)
        }
    }

    //TODO This causes an infinite loop on firefox with polyfills.
    // This is only needed for interactive editing so no priority.
    // disconnectedCallback() {
    // const options = { detail: [this, this.keys], bubbles: true };
    // const event = new CustomEvent('onCiteKeyRemoved', options);
    // document.dispatchEvent(event);
    // }

    /* observe 'key' attribute */

    static get observedAttributes() {
        return ['key'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const eventName = oldValue ? 'onCiteKeyChanged' : 'onCiteKeyCreated';
        const keys = newValue.split(',').map(k => k.trim());
        const options = { detail: [this, keys], bubbles: true };
        const event = new CustomEvent(eventName, options);
        document.dispatchEvent(event);
    }

    set key(value) {
        this.setAttribute('key', value);
    }

    get key() {
        return this.getAttribute('key');
    }

    get keys() {
        return this.getAttribute('key').split(',');
    }

    /* Setters & Rendering */

    set numbers(numbers) {
        this._numbers = numbers;
        this.displayNumbers(numbers);
    }

    get numbers() {
        return this._numbers;
    }

    displayNumbers(numbers) {
        if (!this.innerSpan) return;
        const numberStrings = numbers.map(index => {
            return index == -1 ? '?' : index + 1 + '';
        });
        const textContent = '[' + numberStrings.join(', ') + ']';
        this.innerSpan.textContent = textContent;
    }

    set entries(entries) {
        this._entries = entries;
        this.displayEntries(entries)
    }

    get entries() {
        return this._entries;
    }

    displayEntries(entries) {
        if (!this.hoverBox) return
        this.hoverBox.innerHTML = `<ul>
      ${entries.map(hover_cite).map(html => `<li>${html}</li>`).join('\n')}
    </ul>`;
    }

}
