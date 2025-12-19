/**
 * @param {FormData} form
 * @param {string} boundary
 */
export function formDataIterator(form: FormData, boundary: string): AsyncGenerator<any, void, undefined>;
/**
 * @param {FormData} form
 * @param {string} boundary
 */
export function getFormDataLength(form: FormData, boundary: string): number;
export function getBoundary(): string;
export function toFormData(source: Body & {
    headers?: Headers;
}): Promise<FormData>;
import { FormData } from "../package.js";
//# sourceMappingURL=form-data.d.ts.map