import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-pokemon-listar',
    templateUrl: './listar-pokemons.component.html',
})
export class ListarPokemonsComponent implements OnInit {
    private readonly url = 'https://pokeapi.co/api/v2/';

    Pokedex = require("pokeapi-js-wrapper")
    P = new this.Pokedex.Pokedex()
    entidade: any;

    constructor() {}

    ngOnInit(): void {
        (async () => {
            const pokemon = await this.P.getPokemonByName("bulbasaur")
            this.entidade = pokemon;
          })()
    }

}
