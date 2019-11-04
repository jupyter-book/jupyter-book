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

import { Controller } from './d-controller';
import { domContentLoaded } from './helpers/domContentLoaded.js';

import { Cite } from './d-cite';
import { CitationList } from './d-citation-list';
import { References } from './d-references';


const distillMain = function () {

    if (window.distillRunlevel < 1) {
        throw new Error('Insufficient Runlevel for Distill Template!');
    }

    /* 1. Flag that we're being loaded */
    if ('distillTemplateIsLoading' in window && window.distillTemplateIsLoading) {
        throw new Error('Runlevel 1: Distill Template is getting loaded more than once, aborting!');
    } else {
        window.distillTemplateIsLoading = true;
        console.debug('Runlevel 1: Distill Template has started loading.');
    }

    console.debug('Runlevel 1->2.');
    window.distillRunlevel += 1;

    /* 2. Register Controller listener functions */
    /* Needs to happen before components to their connected callbacks have a controller to talk to. */
    for (const [functionName, callback] of Object.entries(Controller.listeners)) {
        if (typeof callback === 'function') {
            document.addEventListener(functionName, callback);
        } else {
            console.error('Runlevel 2: Controller listeners need to be functions!');
        }
    }
    console.debug('Runlevel 2: We can now listen to controller events.');
    console.debug('Runlevel 2->3.');
    window.distillRunlevel += 1;

    /* 2. Register components */
    const components = [
        Bibliography, Cite, CitationList, References
    ];

    if (window.distillRunlevel < 2) {
        throw new Error('Insufficient Runlevel for adding custom elements!');
    }
    for (const component of components) {
        console.debug('Runlevel 2: Registering custom element: ' + component.is);
        customElements.define(component.is, component);
    }

    console.debug('Runlevel 3: Distill Template finished registering custom elements.');
    console.debug('Runlevel 3->4.');
    window.distillRunlevel += 1;

    // If template was added after DOMContentLoaded we may have missed that event.
    // Controller will check for that case, so trigger the event explicitly:
    if (domContentLoaded()) {
        Controller.listeners.DOMContentLoaded();
    }

    console.debug('Runlevel 4: Distill Template initialisation complete.');
};

window.distillRunlevel = 0;
distillMain()
