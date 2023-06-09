import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ProductsModule)},
   { path: 'detail', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialPagosRoutingModule { }
