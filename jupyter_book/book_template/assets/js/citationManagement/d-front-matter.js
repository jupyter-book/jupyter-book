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

const objectFromMap = function (map) {
    const object = Array.from(map).reduce((object, [key, value]) => (
        Object.assign(object, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
    ), {});
    return object;
};

const mapFromObject = function (object) {
    const map = new Map();
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            map.set(property, object[property]);
        }
    }
    return map;
};


export class FrontMatter {
    constructor() {
        this.bibliography = new Map();
        this.bibliographyParsed = false;
        //  {
        //    'gregor2015draw': {
        //      'title': 'DRAW: A recurrent neural network for image generation',
        //      'author': 'Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan',
        //      'journal': 'arXiv preprint arXiv:1502.04623',
        //      'year': '2015',
        //      'url': 'https://arxiv.org/pdf/1502.04623.pdf',
        //      'type': 'article'
        //    },
        //  }

        // Citation keys should be listed in the order that they are appear in the document.
        // Each key refers to a key in the bibliography dictionary.
        this.citations = []; // [ 'gregor2015draw', 'mercier2011humans' ]
        this.citationsCollected = false;

    }

    //
    // Computed Properties
    //

    get bibliographyEntries() {
        return new Map(this.citations.map(citationKey => {
            const entry = this.bibliography.get(citationKey);
            return [citationKey, entry];
        }));
    }

    set bibliography(bibliography) {
        if (bibliography instanceof Map) {
            this._bibliography = bibliography;
        } else if (typeof bibliography === 'object') {
            this._bibliography = mapFromObject(bibliography);
        }
    }

    get bibliography() {
        return this._bibliography;
    }

    static fromObject(source) {
        const frontMatter = new FrontMatter();
        Object.assign(frontMatter, source);
        return frontMatter;
    }

    assignToObject(target) {
        Object.assign(target, this);
        target.bibliography = objectFromMap(this.bibliographyEntries);
    }

}
