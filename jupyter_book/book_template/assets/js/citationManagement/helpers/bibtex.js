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

import bibtexParse from 'bibtex-parse-js';

function normalizeTag(string) {
    return string
        .replace(/[\t\n ]+/g, ' ')
        .replace(/{\\["^`.'acu~Hvs]( )?([a-zA-Z])}/g, (full, x, char) => char)
        .replace(/{\\([a-zA-Z])}/g, (full, char) => char);
}

export function parseBibtex(bibtex) {
    const bibliography = new Map();
    const parsedEntries = bibtexParse.toJSON(bibtex);
    for (const entry of parsedEntries) {
        // normalize tags; note entryTags is an object, not Map
        for (const [key, value] of Object.entries(entry.entryTags)) {
            entry.entryTags[key.toLowerCase()] = normalizeTag(value);
        }
        entry.entryTags.type = entry.entryType;
        // add to bibliography
        bibliography.set(entry.citationKey, entry.entryTags);
    }
    return bibliography;
}

