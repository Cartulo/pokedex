import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListarPokemonsComponent, PokemonDetailsComponent} from './pages';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {path: 'listar', component: ListarPokemonsComponent},
    {path: 'detalhes/:pokemon', component: PokemonDetailsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PokemonRoutingModule {
}
