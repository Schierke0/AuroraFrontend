import { Component, OnInit } from '@angular/core';
import { ColorPickerControl } from "@iplab/ngx-color-picker";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArchivosService } from "../servicios/archivos.service";
import { PaginaPrincipalService } from "../servicios/pagina-principal.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import Swal from 'sweetalert2'


@Component({
  selector: "app-pagina-principal",
  templateUrl: "./pagina-principal.component.html",
  styleUrls: ["./pagina-principal.component.css"],
})
export class PaginaPrincipalComponent implements OnInit {
  constructor(
    private archivosService: ArchivosService,
    private paginaPrincipalService: PaginaPrincipalService,
    private modalService: NgbModal 
  ) {}

  public compactControl = new ColorPickerControl();
  public compactControl1 = new ColorPickerControl();
  public compactControl2 = new ColorPickerControl();
  public Editor = ClassicEditor;

  ngOnInit(): void {
    this.cargarDatosActuales();
  }

  css: string;
  TituloPagina: string;
  PalabrasClave: string;
  colorFoot: string = this.compactControl.value.toHexString();
  colorTextoTitulo: string = this.compactControl1.value.toHexString();
  colorTextoFooter: string = this.compactControl2.value.toHexString();
  idPagina = "5ecf1c2c5cda54094c696b1f";
  labelLogotipo = "Seleccione Logotipo";
  labelIcono = "Seleccione Icono";
  labelBackground = "Seleccione fondo";

  uploadedFiles: Array<File>;
  uploadedFiles2: Array<File>;
  uploadedFiles3: Array<File>;

  cargarDatosActuales() {
    this.paginaPrincipalService
      .obtenerPaginaPrincipal()
      .subscribe((res: any) => {
        console.log(res);
        this.css = res.css;
        this.TituloPagina = res.TituloPagina;
        this.PalabrasClave = res.PalabrasClave;
        this.colorFoot = res.colorFoot;
        this.colorTextoTitulo = res.colorTextoTitulo;
        this.colorTextoFooter = res.colorTextoFooter;
        this.labelLogotipo = res.acessoRouteLogotipo.split("/").pop();
        this.labelIcono = res.acessoRouteFavIcon.split("/").pop();
        this.labelBackground = res.acessoRouteImagenfondo.split("/").pop();
      });
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.labelLogotipo = element.target.files[0].name;
  }
  fileChange2(element) {
    this.uploadedFiles2 = element.target.files;
    this.labelIcono = element.target.files[0].name;
  }
  fileChange3(element) {
    this.uploadedFiles3 = element.target.files;
    this.labelBackground = element.target.files[0].name;
  }

  guardar() {
    let acessoRouteFavIcon;
    let acessoRouteLogotipo;
    let acessoRouteImagenfondo;

    if (this.uploadedFiles != undefined) {
      let formData = new FormData();
      formData.append("file", this.uploadedFiles[0]);
      this.archivosService.guardarArchivo(formData).subscribe((res: any) => {
        acessoRouteFavIcon = res.ArchivoGuardado.accesoRoute;
        // console.log(acessoRouteFavIcon);
        if (this.uploadedFiles2 != undefined) {
          let formData = new FormData();
          formData.append("file", this.uploadedFiles2[0]);
          this.archivosService
            .guardarArchivo(formData)
            .subscribe((res: any) => {
              acessoRouteLogotipo = res.ArchivoGuardado.accesoRoute;
              //this.enviarDatos(acessoRouteFavIcon, acessoRouteLogotipo );
              if (this.uploadedFiles2 != undefined) {
                let formData = new FormData();
                formData.append("file", this.uploadedFiles2[0]);
                this.archivosService
                  .guardarArchivo(formData)
                  .subscribe((res: any) => {
                    acessoRouteLogotipo = res.ArchivoGuardado.accesoRoute;
                    //this.enviarDatos(acessoRouteFavIcon, acessoRouteLogotipo );
                    if (this.uploadedFiles3 != undefined) {
                      let formData = new FormData();
                      formData.append("file", this.uploadedFiles3[0]);
                      this.archivosService
                        .guardarArchivo(formData)
                        .subscribe((res: any) => {
                          acessoRouteImagenfondo =
                            res.ArchivoGuardado.accesoRoute;
                          this.enviarDatos(
                            acessoRouteFavIcon,
                            acessoRouteLogotipo,
                            acessoRouteImagenfondo
                          );
                        });
                    }
                  });
              }
            });
        }
      });
    }
  }

  enviarDatos(acessoRouteFavIcon, acessoRouteLogotipo, acessoRouteImagenfondo) {
    var paginaPrincipal: any = {
      css: this.limpiar(this.css),
      TituloPagina: this.TituloPagina,
      PalabrasClave: this.PalabrasClave,
      colorFoot: this.colorFoot,
      colorTextoTitulo: this.colorTextoTitulo,
      colorTextoFooter: this.colorTextoFooter,
      acessoRouteFavIcon: acessoRouteFavIcon,
      acessoRouteLogotipo: acessoRouteLogotipo,
      acessoRouteImagenfondo: acessoRouteImagenfondo,
    };

    this.paginaPrincipalService
      .actualizarPaginaPrincipal(paginaPrincipal, this.idPagina)
      .subscribe((res) => {
        Swal.fire("Pagina Principal actualizada", "correctamente", "success");
      });
  }

  /*  colorFoot;
  colorTextoTitulo;
  colorTextoFooter; */
  limpiar(str: string): any {
    str = str.replace(/&nbsp;/g, " ");
    return str.replace(/<[^>]*>/g, "");
  }

  visualizar(modalNombre){

    this.modalService.open(modalNombre, {windowClass: 'my-class'});
  }
}
