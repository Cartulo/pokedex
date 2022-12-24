import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DetalhesPokemonComponent, ListarPokemonsComponent} from './pages';

const routes: Routes = [
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
    {path: 'listar', component: ListarPokemonsComponent},
    {path: 'detalhes/:pokemon', component: DetalhesPokemonComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PokemonRoutingModule {
}
