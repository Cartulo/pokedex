import {Ability} from "./ability";
import {BaseStat} from "./base-stat";
import {Tipagem} from "./type";

export class Pokemon {
    nationalDexNumber: string;
    specieName: string;
    baseStats: BaseStat[];
    types: Tipagem[];
    typeDescription: string;
    abilities: Ability[];
    spriteFront: string;
    spriteBack: string;
};