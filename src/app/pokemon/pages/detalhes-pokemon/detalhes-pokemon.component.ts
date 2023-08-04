import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokeapiWrapperApiService} from 'projects/api/src/lib/modules/pokemon';

@Component({
    selector: 'app-pokemon-detalhes',
    templateUrl: './detalhes-pokemon.component.html',
})
export class DetalhesPokemonComponent {
    pokemonSelecionado: any;
    descricaoPokemon: any = [];

    constructor(
        private route: ActivatedRoute,
        private service: PokeapiWrapperApiService) {
        this.obterPokemonPelaRota();
    }

    onClickInfoPokemon() {
        console.clear();
        console.log('pokemonSelecionado', this.pokemonSelecionado)
    }

    obterPokemonPelaRota() {
        this.route.params.subscribe(async pokemon => {
            this.pokemonSelecionado = await this.service.obterPokemonPeloNome(pokemon.pokemon);
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
