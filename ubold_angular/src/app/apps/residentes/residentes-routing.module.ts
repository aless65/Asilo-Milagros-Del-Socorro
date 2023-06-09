import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CustomersComponent } from './customers/customers.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { LeadsComponent } from './leads/leads.component';
// import { OpportunitiesComponent } from './opportunities/opportunities.component';

const routes: Routes = [
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  { path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule) },
  { path: 'edit/:id', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) },
  { path: 'historial', loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule) },
//   { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
//   { path: 'leads', loadChildren: () => import('./leads/leads.module').then(m => m.LeadsModule) },
//   { path: 'opportunities', loadChildren: () => import('./opportunities/opportunities.module').then(m => m.OpportunitiesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentesRoutingModule { }
