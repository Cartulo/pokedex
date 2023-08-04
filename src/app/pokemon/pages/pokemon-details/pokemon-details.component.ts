import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokeapiWrapperApiService} from 'projects/api/src/lib/modules/pokemon';
import {Pokemon} from 'projects/api/src/lib/modules/pokemon/pokeapi-wrapper/models';

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent {
    selectedPokemon: Pokemon;

    constructor(
        private route: ActivatedRoute,
        private service: PokeapiWrapperApiService) {
        this.getPokemonByRoute();
    }

    onClickPokemonInfo() {
        console.clear();
        console.log('selected pokemon:', this.selectedPokemon)
    }

    private getPokemonByRoute() {
        this.route.params.subscribe(async pokemon => {
            this.selectedPokemon = await this.service.getPokemonByName(pokemon.pokemon);
        })
    }
}
