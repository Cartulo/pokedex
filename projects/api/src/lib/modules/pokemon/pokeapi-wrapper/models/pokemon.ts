import {Ability} from "./ability";
import {BaseStat} from "./status-base";
import {Tipagem} from "./tipagem";

export class Pokemon {
    numeroNationalDex: string;
    nomeEspecie: string;
    statusBase: BaseStat[];
    tipagens: Tipagem[];
    tipagensDesc: string;
    habilidades: Ability[];
    spriteFrente: string;
    spriteCostas: string;
};