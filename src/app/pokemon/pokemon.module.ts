import {NgModule} from '@angular/core';

import {ComponentsModule} from 'projects/components/src/public-api';
import {PokemonRoutingModule} from './pokemon-routing.module';

import {ListarPokemonsComponent, PokemonDetailsComponent} from './pages';
import {PokemonComponent} from './pokemon.component';

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
        PokemonDetailsComponent
    ],
})
export class PokemonModule {
}
