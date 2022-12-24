import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-pokemon-detalhes',
    templateUrl: './detalhes-pokemon.component.html',
})
export class DetalhesPokemonComponent {
    Pokedex = require("pokeapi-js-wrapper")
    service = new this.Pokedex.Pokedex()

    pokemonSelecionado: any;
    descricaoPokemon: any = [];

    constructor(
        private route: ActivatedRoute) {
        this.obterPokemonPelaRota();
    }

    obterPokemonPelaRota() {
        this.route.params.subscribe(async pokemon => {
            this.pokemonSelecionado = await this.service.getPokemonByName(pokemon.pokemon);
            let pokemonDetalhado = await this.service.getPokemonSpeciesByName(this.pokemonSelecionado.name);
            this.obterDescricaoPeloJogo(pokemonDetalhado);
        })
    }

    private async obterDescricaoPeloJogo(pokemon) {
        pokemon.flavor_text_entries.filter(entry => {
            if (entry.language.name === 'en') {

                let descricao = {
                    text: entry.flavor_text,
                    version: entry.version.name
                }

                this.descricaoPokemon.push(descricao)
            }
        })

    }

}
