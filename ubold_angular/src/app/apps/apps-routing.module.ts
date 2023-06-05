import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
  { path: 'enfermedades', loadChildren: () => import('./enfermedades/enfermedades.module').then(m => m.EnfermedadesModule) },
  { path: 'proveedores', loadChildren: () => import('./proveedores/proveedores.module').then(m => m.ProveedoresModule) },
  {path: 'centros', loadChildren: () => import('./centros/centros.module').then(m => m.CentrosModule) },
  { path: 'cargos', loadChildren: () => import('./cargos/cargos.module').then(m => m.CargosModule) },
  { path: 'habitaciones', loadChildren: () => import('./habitaciones/habitaciones.module').then(m => m.HabitacionesModule) },
  { path: 'empleados', loadChildren: () => import('./empleados/empleados.module').then(m => m.EmpleadosModule) },
  { path: 'encargados', loadChildren: () => import('./encargados/encargados.module').then(m => m.EncargadosModule) },
  { path: 'histoarialPagos', loadChildren: () => import('./historialPagos/historialPago.module').then(m => m.HistorialPagoModule) },
  { path: 'donaciones', loadChildren: () => import('./donaciones/donaciones.module').then(m => m.DonacionesModule) },


  { path: 'residentes', loadChildren: () => import('./residentes/residentes.module').then(m => m.ResidentesModule) },
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crm', loadChildren: () => import('./crm/crm.module').then(m => m.CrmModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'social-feed', loadChildren: () => import('./social-feed/social-feed.module').then(m => m.SocialFeedModule) },
  { path: 'companies', loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'tickets', loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule) },
  { path: 'file-manager', loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }