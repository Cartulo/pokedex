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

    async obterPokemonPeloNome(nome: string) {
        let pokemon = await this.service.getPokemonByName(nome);

        return this.formatarDados(pokemon);
    }

    // #region Métodos Auxiliares
    private formatarDados(entidade) {
        let pokemon = new Pokemon;

        pokemon.numeroNationalDex = this.formatarNumeroPokedex(entidade);
        pokemon.nomeEspecie = this.formatarNomeEspecie(entidade.name);
        pokemon.spriteFrente = entidade.sprites.front_default;
        pokemon.tipagens = this.formatarTipagens(entidade);
        pokemon.habilidades = this.formatarHabilidades(entidade.abilities);
        pokemon.statusBase = this.formatarStatusBase(entidade.stats);

        return pokemon;
    }

    private formatarNumeroPokedex(entidade): string {
        let numeroPokedex = entidade.id;
        let prefixoNum = '0';
        let tamanhoNum = 4;

        let numeroPokedexFormatado = (String(prefixoNum).repeat(tamanhoNum) + numeroPokedex).substr(tamanhoNum * -1, tamanhoNum);

        return numeroPokedexFormatado;
    }

    private formatarNomeEspecie(entidade): string {
        return this.formatarPrimeiraLetraParaMaisculo(entidade);
    }

    private formatarTipagens(entidade): Tipagem[] {
        let listaTipagens: Tipagem[] = [];
        let tipagemPrincipal = new Tipagem;
        let tipagemSecundaria = new Tipagem;

        if (entidade.types[1]) {
            tipagemSecundaria.nome = entidade.types[1].type.name;
            tipagemSecundaria.hexColor = this.tipagens.find(type => type.name === tipagemSecundaria.nome).hexColor;
            tipagemSecundaria.nome = this.formatarPrimeiraLetraParaMaisculo(tipagemSecundaria.nome);
        }

        tipagemPrincipal.nome = entidade.types[0].type.name;
        tipagemPrincipal.hexColor = this.tipagens.find(type => type.name === tipagemPrincipal.nome).hexColor;
        tipagemPrincipal.nome = this.formatarPrimeiraLetraParaMaisculo(tipagemPrincipal.nome);

        listaTipagens.push(tipagemPrincipal, tipagemSecundaria);
        return listaTipagens;
    }

    private formatarHabilidades(entidade): Ability[] {
        let abilities: Ability[] = [];

        entidade.forEach(ability => {
            let formatedAbility = new Ability;

            formatedAbility.name = ability.ability.name;
            formatedAbility.isHidden = ability.is_hidden;

            abilities.push(formatedAbility);
        })

        return abilities;
    }

    private formatarStatusBase(entidade): BaseStat[] {
        let resultado: BaseStat[] = [];

        entidade.forEach(stat => {
            let baseStat = new BaseStat;

            baseStat.nome = this.formatarNomeStatusBase(stat.stat.name);
            baseStat.valor = stat.base_stat;

            resultado.push(baseStat);
        })

        return resultado
    }

    private formatarPrimeiraLetraParaMaisculo(palavra: string): string {
        return palavra[0].toUpperCase() + palavra.substring(1);
    }

    private formatarNomeStatusBase(statusBase): string {
        return statusBase;

        let resultado: string;

        return resultado;
    }

    // #endregion

}