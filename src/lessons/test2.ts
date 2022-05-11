import { number } from "io-ts";

export default `
import {typeAssert, IsNotAny, IsTypeEqual} from 'TypeAssertions';
import {MakeOptional, OptionalUser} from './main';

typeAssert<IsTypeEqual<OptionalUser, {
    id?: number; 
    name: string;
    active: boolean;
    registeredAt: Date; 
}>>();

typeAssert<IsTypeEqual<MakeOptional<{id: number, type: string}, "id">, {
    id?: number;
    type: string;
}>>();

export default {}
`;
