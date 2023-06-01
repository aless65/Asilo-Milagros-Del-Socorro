import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  { path: 'crear', loadChildren: () => import('./crear/crear.module').then(m => m.ValidationModule) },
  {path: 'editar',  loadChildren: () => import('./editar/editar.module').then(m => m.ValidationModule)},
  {path: 'details',  loadChildren: () => import('./details/details.module').then(m => m.DetailModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
