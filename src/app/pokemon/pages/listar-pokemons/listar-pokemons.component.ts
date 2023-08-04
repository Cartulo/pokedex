import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PokeapiWrapperApiService} from 'projects/api/src/lib/modules/pokemon';

@Component({
    selector: 'app-pokemon-listar',
    templateUrl: './listar-pokemons.component.html'
})
export class ListarPokemonsComponent implements OnInit {
    entidades: any[] = [];
    listaNomePokemons: string[] = [
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

    constructor(
        private router: Router,
        private service: PokeapiWrapperApiService) {
    }

    ngOnInit(): void {
        this.carregarDados();
    }

    onClickDetalhesPokemon(pokemon) {
        let nomePokemon = pokemon.nomeEspecie.toLowerCase();
        this.router.navigate([`pokemon/detalhes/${nomePokemon}`])
    }

    private async carregarDados() {
        for (const pokemon of this.listaNomePokemons) {
            this.entidades.push(await this.service.getPokemonByName(pokemon));
        }
    }
}