import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
//   { path: 'crear', loadChildren: () => import('./crear/crear.module').then(m => m.ValidationModule) },
  {path: 'edit/:id',  loadChildren: () => import('./edit/edit.module').then(m => m.EditModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendasRoutingModule { }
