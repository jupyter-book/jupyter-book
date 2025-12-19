import {FetchBaseError} from './base.js';

/**
 * AbortError interface for cancelled requests
 */
export class AbortError extends FetchBaseError {
	/**
	 * @param {string} message 
	 * @param {string} [type]
	 */
	constructor(message, type = 'aborted') {
		super(message, type);
	}
}
