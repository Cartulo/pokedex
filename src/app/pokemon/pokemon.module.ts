import {NgModule} from '@angular/core';

import {ComponentsModule} from 'projects/components/src/public-api';
import {PokemonRoutingModule} from './pokemon-routing.module';

import {PokemonComponent} from './pokemon.component';
import {DetalhesPokemonComponent, ListarPokemonsComponent} from './pages';

@NgModule({
    imports: [
        ComponentsModule,
        PokemonRoutingModule
    ],
    exports: [
    ],
    declarations: [
        PokemonComponent,
        ListarPokemonsComponent,
        DetalhesPokemonComponent
    ],
})
export class PokemonModule {
}
