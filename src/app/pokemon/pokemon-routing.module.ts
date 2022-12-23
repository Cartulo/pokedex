import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListarPokemonsComponent} from './pages/listar-pokemons/listar-pokemons.component';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {path: 'listar', component: ListarPokemonsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PokemonRoutingModule {
}
