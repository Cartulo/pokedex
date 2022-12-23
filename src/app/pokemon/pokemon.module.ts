import {NgModule} from '@angular/core';

import {ComponentsModule} from 'projects/components/src/public-api';
import {PokemonRoutingModule} from './pokemon-routing.module';

import {PokemonComponent} from './pokemon.component';
import {ListarPokemonsComponent} from './pages/listar-pokemons/listar-pokemons.component';

@NgModule({
    declarations: [
        PokemonComponent,
        ListarPokemonsComponent
    ],
    imports: [
        ComponentsModule,
        PokemonRoutingModule
    ],
    exports: []
})
export class PokemonModule {
}
