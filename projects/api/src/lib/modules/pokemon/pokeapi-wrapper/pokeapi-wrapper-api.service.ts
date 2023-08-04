import {Injectable} from '@angular/core';

import {Ability, BaseStat, Pokemon, Tipagem} from './models';

@Injectable({providedIn: 'root'})
export class PokeapiWrapperApiService {
    Pokedex = require("pokeapi-js-wrapper")
    service = new this.Pokedex.Pokedex()

    tipagens: any[] = [
        {name: 'bug', hexColor: '#A6B91A'},
        {name: 'dark', hexColor: '#705746'},
        {name: 'dragon', hexColor: '#6F35FC'},
        {name: 'electric', hexColor: '#F7D02C'},
        {name: 'fairy', hexColor: '#D685AD'},
        {name: 'fighting', hexColor: '#C22E28'},
        {name: 'fire', hexColor: '#EE8130'},
        {name: 'flying', hexColor: '#A98FF3'},
        {name: 'ghost', hexColor: '#735797'},
        {name: 'grass', hexColor: '#7AC74C'},
        {name: 'ground', hexColor: '#E2BF65'},
        {name: 'ice', hexColor: '#96D9D6'},
        {name: 'normal', hexColor: '#A8A77A'},
        {name: 'poison', hexColor: '#A33EA1'},
        {name: 'psychic', hexColor: '#F95587'},
        {name: 'rock', hexColor: '#B6A136'},
        {name: 'steel', hexColor: '#B7B7CE'},
        {name: 'water', hexColor: '#6390F0'},
    ]

    async getPokemonByName(nome: string) {
        let pokemon = await this.service.getPokemonByName(nome);

        return this.formatData(pokemon);
    }

    // #region Métodos Auxiliares
    private formatData(entidade) {
        let pokemon = new Pokemon;

        pokemon.nationalDexNumber = this.formatPokedexNumber(entidade);
        pokemon.specieName = this.formatSpecieName(entidade.name);
        pokemon.spriteFront = entidade.sprites.front_default;
        pokemon.types = this.formatTypes(entidade);
        pokemon.abilities = this.formatAbilities(entidade.abilities);
        pokemon.baseStats = this.formatBaseStats(entidade.stats);

        return pokemon;
    }

    private formatPokedexNumber(entidade): string {
        let numeroPokedex = entidade.id;
        let prefixoNum = '0';
        let tamanhoNum = 4;

        let numeroPokedexFormatado = (String(prefixoNum).repeat(tamanhoNum) + numeroPokedex).substr(tamanhoNum * -1, tamanhoNum);

        return numeroPokedexFormatado;
    }

    private formatSpecieName(entidade): string {
        return this.formatFirstLetterToUppercase(entidade);
    }

    private formatTypes(entidade): Tipagem[] {
        let listaTipagens: Tipagem[] = [];
        let tipagemPrincipal = new Tipagem;
        let tipagemSecundaria = new Tipagem;

        if (entidade.types[1]) {
            tipagemSecundaria.name = entidade.types[1].type.name;
            tipagemSecundaria.hexColor = this.tipagens.find(type => type.name === tipagemSecundaria.name).hexColor;
            tipagemSecundaria.name = this.formatFirstLetterToUppercase(tipagemSecundaria.name);
        }

        tipagemPrincipal.name = entidade.types[0].type.name;
        tipagemPrincipal.hexColor = this.tipagens.find(type => type.name === tipagemPrincipal.name).hexColor;
        tipagemPrincipal.name = this.formatFirstLetterToUppercase(tipagemPrincipal.name);

        listaTipagens.push(tipagemPrincipal, tipagemSecundaria);
        return listaTipagens;
    }

    private formatAbilities(abilities): Ability[] {
        abilities.forEach(ability => {
            let formatedAbility = new Ability;

            formatedAbility.name = ability.ability.name;
            formatedAbility.isHidden = ability.is_hidden;

            abilities.push(formatedAbility);
        })

        return abilities;
    }

    private formatBaseStats(baseStats): BaseStat[] {
        let resultado: BaseStat[] = [];

        baseStats.forEach(stat => {
            let baseStat = new BaseStat;

            baseStat.name = this.formatBaseStatName(stat.stat.name);
            baseStat.value = stat.base_stat;

            resultado.push(baseStat);
        })

        return resultado
    }

    private formatFirstLetterToUppercase(word: string): string {
        return word[0].toUpperCase() + word.substring(1);
    }

    private formatBaseStatName(baseStat): string {
        return baseStat;

        let resultado: string;

        return resultado;
    }

    // #endregion

}