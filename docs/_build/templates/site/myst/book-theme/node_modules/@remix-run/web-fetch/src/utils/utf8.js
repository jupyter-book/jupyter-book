import {TextEncoder, TextDecoder} from 'util';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * @param {string} text
 */
export const encode = text => encoder.encode(text);

/**
 * @param {Uint8Array} bytes
 */
export const decode = bytes => decoder.decode(bytes);
