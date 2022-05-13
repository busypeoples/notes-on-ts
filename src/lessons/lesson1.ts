const code = `/**
*
* Let's define some basic types for learning purposes.
* TypeScript should be able to infer these types, but as training exercise, let's
* try to get rid of all \`any\` types and make the tests pass.
*
*/

export const a: any = 1;
export const b: any = "Hello";
export const c: any = [1, 2, 3];
export const d: any = {id: 1, name: "Some Name", active: true};
export const e: any = ["hello", 1];
export const f: any = new Date();
export const g: any = (n) => {return n * n};
`;

const test = `
import { typeAssert, IsNotAny } from 'TypeAssertions';
import { a, b, c, d, e, f, g } from './main';

typeAssert<IsNotAny<typeof a>>();
typeAssert<IsNotAny<typeof b>>();
typeAssert<IsNotAny<typeof c>>();
typeAssert<IsNotAny<typeof d>>();
typeAssert<IsNotAny<typeof e>>();
typeAssert<IsNotAny<typeof f>>();
typeAssert<IsNotAny<typeof g>>();

export default {}
`;

export { code, test };
