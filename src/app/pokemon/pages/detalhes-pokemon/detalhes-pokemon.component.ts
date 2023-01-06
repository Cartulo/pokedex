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

    onClickInfoPokemon() {
        console.clear();
        console.log('pokemonSelecionado', this.pokemonSelecionado)
        console.log('descricaoPokemon', this.descricaoPokemon)
    }

    obterPokemonPelaRota() {
        this.route.params.subscribe(async pokemon => {
            this.pokemonSelecionado = await this.service.getPokemonByName(pokemon.pokemon);
            let pokemonDetalhado = await this.service.getPokemonSpeciesByName(this.pokemonSelecionado.name);
            this.obterDetalhesPeloNome(pokemonDetalhado);

            this.obterSpecies(pokemonDetalhado);
        })
    }

    private obterDetalhesPeloNome(pokemon) {
        pokemon.flavor_text_entries.filter(entry => {
            if (entry.language.name === 'en') {

                let descricao = {
                    name: this.pokemonSelecionado.name,
                    nationalNumber: this.obterNationalNumber(pokemon),
                    species: this.obterSpecies(pokemon),
                    abilities: this.obterAbilities(this.pokemonSelecionado),
                    baseStats: this.obterBaseStats(this.pokemonSelecionado),
                    pokedexEntry: this.obterPokedexEntry(pokemon),
                }

                this.descricaoPokemon = descricao;
            }
        })

    }

    private obterNationalNumber(pokemon) {
        let nationalNumber;

        pokemon.pokedex_numbers.filter(entry => {
            if (entry.pokedex.name === 'national') {
                nationalNumber = entry.entry_number;
            };
        });

        return nationalNumber;
    }

    private obterSpecies(pokemon) {
        let species;

        pokemon.genera.filter(entry => {
            if (entry.language.name === 'en') {
                species = entry.genus;
            };
        });

        return species;
    }

    private obterAbilities(pokemon) {
        let abilities = [];

        pokemon.abilities.filter(entry => {

            let abilityDesc = {
                name: entry.ability.name,
                isHidden: entry.is_hidden 
            };

            abilities.push(abilityDesc);
        });

        return abilities;
    }

    private obterBaseStats(pokemon) {
        let baseStats = [];

        pokemon.stats.filter(entry => {

            let statDesc = {
                stat: entry.stat.name,
                baseStat: entry.base_stat,
                evYieldValue: entry.effort
            };

            baseStats.push(statDesc);
        });

        return baseStats;
    }

    private obterPokedexEntry(pokemon) {
        let pokedexEntry;

        pokemon.flavor_text_entries.filter(entry => {
            if (entry.language.name === 'en') {
                pokedexEntry = entry.flavor_text;
            };
        });

        return pokedexEntry;
    }
}
