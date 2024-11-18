/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function isEmpty(value: any): value is null | undefined | "" | {} {
    return (
        // null or undefined
        // eslint-disable-next-line no-eq-null
        value == null ||
        // has length and it's zero
        // eslint-disable-next-line no-prototype-builtins
        (value.hasOwnProperty("length") && value.length === 0) ||
        // is an Object and has no keys
        (value.constructor === Object && Object.keys(value).length === 0)
    );
}
