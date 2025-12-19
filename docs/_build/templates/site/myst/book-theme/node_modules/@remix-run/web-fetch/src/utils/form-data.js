import {randomBytes} from 'crypto';
import { iterateMultipart } from '@web3-storage/multipart-parser';
import { FormData, File } from '../package.js';
import { isBlob } from './is.js';

const carriage = '\r\n';
const dashes = '-'.repeat(2);
const carriageLength = Buffer.byteLength(carriage);

/**
 * @param {string} boundary
 */
const getFooter = boundary => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;

/**
 * @param {string} boundary
 * @param {string} name
 * @param {*} field
 *
 * @return {string}
 */
function getHeader(boundary, name, field) {
	let header = '';

	header += `${dashes}${boundary}${carriage}`;
	header += `Content-Disposition: form-data; name="${name}"`;

	if (isBlob(field)) {
		const { name = 'blob', type } = /** @type {Blob & {name?:string}} */ (field);
		header += `; filename="${name}"${carriage}`;
		header += `Content-Type: ${type || 'application/octet-stream'}`;
	}

	return `${header}${carriage.repeat(2)}`;
}

/**
 * @return {string}
 */
export const getBoundary = () => randomBytes(8).toString('hex');

/**
 * @param {FormData} form
 * @param {string} boundary
 */
export async function * formDataIterator(form, boundary) {
	const encoder = new TextEncoder();
	for (const [name, value] of form) {
		yield encoder.encode(getHeader(boundary, name, value));

		if (isBlob(value)) {
			// @ts-ignore - we know our streams implement aysnc iteration
			yield * value.stream();
		} else {
			yield encoder.encode(value);
		}

		yield encoder.encode(carriage);
	}

	yield encoder.encode(getFooter(boundary));
}

/**
 * @param {FormData} form
 * @param {string} boundary
 */
export function getFormDataLength(form, boundary) {
	let length = 0;

	for (const [name, value] of form) {
		length += Buffer.byteLength(getHeader(boundary, name, value));

		if (isBlob(value)) {
			length += value.size;
		} else {
			length += Buffer.byteLength(String(value));
		}

		length += carriageLength;
	}

	length += Buffer.byteLength(getFooter(boundary));

	return length;
}

/**
 * @param {Body & {headers?:Headers}} source
 */
export const toFormData = async (source) => {
  let { body, headers } = source;
  const contentType = headers?.get('Content-Type') || ''

  if (contentType.startsWith('application/x-www-form-urlencoded') && body != null) {
		const form = new FormData();
		let bodyText = await source.text();
		new URLSearchParams(bodyText).forEach((v, k) => form.append(k, v));
		return form;
  }

  const [type, boundary] = contentType.split(/\s*;\s*boundary=/)
  if (type === 'multipart/form-data' && boundary != null && body != null) {
    const form = new FormData()
    const parts = iterateMultipart(body, boundary)
    for await (const { name, data, filename, contentType } of parts) {
      if (typeof filename === 'string') {
        form.append(name, new File([data], filename, { type: contentType }))
      } else if (typeof filename !== 'undefined') {
        form.append(name, new File([], '', { type: contentType }))
      } else {
        form.append(name, new TextDecoder().decode(data), filename)
      }
    }
    return form
  } else {
    throw new TypeError('Could not parse content as FormData.')
  }
}
