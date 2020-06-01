import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PaginaPrincipalService } from '../servicios/pagina-principal.service';
import { PaginaEstaticaService } from '../servicios/pagina-estatica.service';
import { CanActivate, Router } from "@angular/router";
import { LocalStaticService } from '../pagina-estatica/local-static.service';

@Component({
  selector: "app-pagina-principal-show",
  templateUrl: "./pagina-principal-show.component.html",
  styleUrls: ["./pagina-principal-show.component.css"],
})
export class PaginaPrincipalShowComponent implements OnInit {
  constructor(
    private paginaPrincipalService: PaginaPrincipalService,
    private paginaEstaticaService: PaginaEstaticaService,
    private router: Router,
    private localStaticService: LocalStaticService
  ) {}
  /* @Output() onActualizarId = new EventEmitter(); */
  css;
  TituloPagina;
  PalabrasClave;
  colorFoot;
  colorTextoTitulo;
  colorTextoFooter;
  acessoRouteFavIcon = "http://localhost:8888";
  acessoRouteLogotipo = "http://localhost:8888";
  acessoRouteImagenfondo = "http://localhost:8888";
  paginasEstaticas: any = [];

  ngOnInit(): void {
    this.paginaEstaticaService.obtenerPaginas().subscribe((res: any) => {
     // console.log(res);
      this.paginasEstaticas = res;
    });
    this.paginaPrincipalService
      .obtenerPaginaPrincipal()
      .subscribe((res: any) => {
        (this.css = res.css),
          (this.TituloPagina = res.TituloPagina),
          (this.PalabrasClave = res.PalabrasClave),
          (this.colorFoot = res.colorFoot),
          (this.colorTextoTitulo = res.colorTextoTitulo),
          (this.colorTextoFooter = res.colorTextoFooter),
          (this.acessoRouteFavIcon += res.acessoRouteFavIcon),
          (this.acessoRouteLogotipo += res.acessoRouteLogotipo),
          (this.acessoRouteImagenfondo += res.acessoRouteImagenfondo);
        //console.log(this.colorFoot);
      });

    //http://localhost:
  }
  obtenerSource() {
    //console.log(`url('${this.acessoRouteImagenfondo}')`);
    return `url('${this.acessoRouteImagenfondo}')`;
  }
  enviarId(idPaginaEstatica) {
    /* this.onActualizarId.emit(idPaginaEstatica); */
    this.localStaticService.actualizarId(idPaginaEstatica);
    this.router.navigate(["/paginaEstaticaGenerada"]);
  }
}
