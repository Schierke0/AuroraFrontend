import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroAdminComponent } from './tablero-admin/tablero-admin.component';
import { AdminPaginasComponent } from './admin-paginas/admin-paginas.component';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { CrearTemaComponent } from './crear-tema/crear-tema.component';
import { NuevaPagEstaticaComponent } from './nueva-pag-estatica/nueva-pag-estatica.component';
import { NuevaPagPostComponent } from './nueva-pag-post/nueva-pag-post.component';
import { RecursosComponent } from './recursos/recursos.component';
import { SeleccionarTemaComponent } from './seleccionar-tema/seleccionar-tema.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {PaginaPrincipalShowComponent} from './pagina-principal-show/pagina-principal-show.component'
import { PaginaEstaticaComponent } from './pagina-estatica/pagina-estatica.component';
const routes: Routes = [
{
  path:"dashboard",
  component: TableroAdminComponent,
    children: [
      {
        path: "admin-paginas",
        component: AdminPaginasComponent,
      },
      {
        path: "admin-post",
        component: AdminPostComponent,
      },
      {
        path: "admin-usuarios",
        component: AdminUsuariosComponent,
      },
      {
        path: "crear-tema",
        component: CrearTemaComponent,
      },
      {
        path: "nueva-pag-estatica",
        component: NuevaPagEstaticaComponent,
      },
      {
        path: "nueva-pagina-post",
        component: NuevaPagPostComponent,
      },
      {
        path: "recursos",
        component: RecursosComponent,
      },
      {
        path: "seleccionar-tema",
        component: SeleccionarTemaComponent,
      },
      {
        path: "pagina-principal-admin",
        component: PaginaPrincipalComponent,
      },
      {
        path: "usuarios",
        component: UsuariosComponent,
      }
    ]
},
{
  path:"pagina-principal",
  component:PaginaPrincipalComponent
},
{
  path: "login",
  component: LoginComponent
},
{
  path: '',
  component: LandingPageComponent
},
{
  path: "paginaPrincipal",
  component: PaginaPrincipalShowComponent
},
{
  path: "paginaEstaticaGenerada",
  component: PaginaEstaticaComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






