import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { TableroAdminComponent } from './tablero-admin/tablero-admin.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { RecursosComponent } from './recursos/recursos.component';
import { NuevaPagPostComponent } from './nueva-pag-post/nueva-pag-post.component';
import { NuevaPagEstaticaComponent } from './nueva-pag-estatica/nueva-pag-estatica.component';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { SeleccionarTemaComponent } from './seleccionar-tema/seleccionar-tema.component';
import { CrearTemaComponent } from './crear-tema/crear-tema.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminPaginasComponent } from './admin-paginas/admin-paginas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    TableroAdminComponent,
    PaginaPrincipalComponent,
    RecursosComponent,
    NuevaPagPostComponent,
    NuevaPagEstaticaComponent,
    AdminPostComponent,
    SeleccionarTemaComponent,
    CrearTemaComponent,
    AdminUsuariosComponent,
    AdminPaginasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
