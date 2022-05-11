export default `/**
*
* Implement this MakeOptional type which should accept
* a type and properties to make optional
*
* Example:
*
* MakeOptional<User, "id">
*
* should return
*
* type OptionalUser = {
*  id?: string;
*  name: string;
*  active: boolean;
*  registeredAt: Date | null;
* }
*/

export type MakeOptional<Type, Keys extends keyof Type> = User;

type User = {
 id: number;
 name: string;
 active: boolean;
 registeredAt: Date | null;
};

// Create a User type with optional id

export type OptionalUser = MakeOptional<User, "id">;

const optionalUserA: OptionalUser = {
 name: "Test User",
 active: false,
 registeredAt: null,
}
   
const optionalUserB: OptionalUser = {
 id: 1,
 name: "Test User",
 active: false,
 registeredAt: null,
}
`;
