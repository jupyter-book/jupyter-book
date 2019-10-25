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

/*global ShadyCSS*/
export const Template = (name, templateString, useShadow = true) => {

    return (superclass) => {

        const template = document.createElement('template');
        template.innerHTML = templateString;

        if (useShadow && 'ShadyCSS' in window) {
            ShadyCSS.prepareTemplate(template, name);
        }

        return class extends superclass {

            static get is() { return name; }

            constructor() {
                super();

                this.clone = document.importNode(template.content, true);
                if (useShadow) {
                    this.attachShadow({ mode: 'open' });
                    this.shadowRoot.appendChild(this.clone);
                }
            }

            connectedCallback() {
                if (this.hasAttribute('distill-prerendered')) {
                    return;
                }
                if (useShadow) {
                    if ('ShadyCSS' in window) {
                        ShadyCSS.styleElement(this);
                    }
                } else {
                    this.insertBefore(this.clone, this.firstChild);
                }
            }

            get root() {
                if (useShadow) {
                    return this.shadowRoot;
                } else {
                    return this;
                }
            }

            /* TODO: Are we using these? Should we even? */
            $(query) {
                return this.root.querySelector(query);
            }

            $$(query) {
                return this.root.querySelectorAll(query);
            }
        };
    };
};