import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-pokemon-listar',
    templateUrl: './listar-pokemons.component.html',
})
export class ListarPokemonsComponent implements OnInit {
    Pokedex = require("pokeapi-js-wrapper")
    service = new this.Pokedex.Pokedex()

    entidade: any[] = [];
    pokemons: string[] = [
        'bulbasaur',
        'ivysaur',
        'venusaur',
        'charmander',
        'charmeleon',
        'charizard',
        'squirtle',
        'wartortle',
        'blastoise',
        'caterpie',
        'metapod',
        'butterfree',
        'weedle',
        'kakuna',
        'beedrill',
        'pidgey',
        'pidgeotto',
        'pidgeot'
    ]

    constructor() {
    }

    ngOnInit(): void {
        this.obterTodosPokemon();
    }

    obterTodosPokemon() {
        (async () => {
            for (const pokemon of this.pokemons) {
                let teste = await this.service.getPokemonByName(pokemon)

                this.entidade.push(teste);

            }
        })();
    }

}
