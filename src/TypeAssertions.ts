export default `export function typeAssert<X extends true>() {};
export type IsNotAny<Y> = 0 extends (1 & Y) ? false : true;
export type IsTypeEqual<T1, T2> = IsNotAny<T1> extends false ? false : (
    IsNotAny<T2> extends false ? false : (
        [T1] extends [T2] ? ([T2] extends [T1] ? true : false): false
    )
)`;
