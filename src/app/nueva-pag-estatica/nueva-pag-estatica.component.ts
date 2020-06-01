import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PaginaEstaticaService } from '../servicios/pagina-estatica.service';
import { ArchivosService } from '../servicios/archivos.service';
import Swal from 'sweetalert2'
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { PaginaPostService } from '../servicios/pagina-post.service';
declare var CKEDITOR: any;
declare var $: any;
@Component({ 
  selector: 'app-nueva-pag-estatica',
  templateUrl: './nueva-pag-estatica.component.html',
  styleUrls: ['./nueva-pag-estatica.component.css']
})
export class NuevaPagEstaticaComponent implements OnInit {
//codigos: C001=pagina activa, C002= incluir encambezado, C003= incluir pie de pagina
  constructor(
    private paginaEstaticaService: PaginaEstaticaService, 
    private archivosService: ArchivosService,
    private paginaPostService: PaginaPostService) { }
  public Editor = ClassicEditor;

  ngOnInit(): void {
        /* this.fetchSelectedItems()
    this.fetchCheckedIDs() */
  }


/*   public onChange({ editor }: ChangeEvent) {
    const data = editor.getData().split('</p><p>');

    console.log(data);
  } */

  Titulo:string=' ';
  TituloMenu: string=' ';
  PaginaPadre:string=' ';
  Url:string=' ';
  PalabrasClave:string=' ';
  Descripcion:string=' ';
  shortcuts:string=' ';
  shortCutsArray=[];
  carrouselImagenes=[];
  PaginaEstaticaJson:any;
  idActual;

  selectedItemsList = [];
  checkedIDs:any = {
    EstadoPagina:false,
    Encabezado:false,
    PiePagina:false
  };
  checkboxesDataList = [
    {
      id: 'EstadoPagina',
      label: 'Estado de la pagina activo',
      isChecked: false
    },
    {
      id: 'Encabezado',
      label: 'Incluir encabezado',
      isChecked: false
    },
    {
      id: 'PiePagina',
      label: 'Incluir pie de pagina',
      isChecked: false
    },
  ]

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs() {
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs[value.id]=true;
      }
    });
  }

  public onChange({ editor }: ChangeEvent) {
     this.shortcuts = editor.getData();
  }

 ResetInputs(){
   this.Titulo= ' ';
   this.TituloMenu= ' ';
   this.PaginaPadre= ' ';
   this.Url= ' ';
   this.PalabrasClave= ' ';
   this.Descripcion= ' ';
   this.shortcuts;
   this.shortCutsArray = [];
   this.carrouselImagenes = [];
   this.PaginaEstaticaJson={};
 }


  guardar() {
    this.fetchCheckedIDs();
    this.PaginaEstaticaJson={
      Titulo: this.Titulo,
      TituloMenu: this.TituloMenu,
      PaginaPadre: this.PaginaPadre,
      Url: this.Url,
      PalabrasClave: this.PalabrasClave,
      Descripcion: this.Descripcion,
      opciones: this.checkedIDs
    }
  this.paginaEstaticaService.crearPagina(this.PaginaEstaticaJson).subscribe((res: any) => {
       this.idActual = res.ArchivoGuardado._id;
       console.log(res.ArchivoGuardado._id);
       this.getPageHtml();
       Swal.fire(
                'Pagina nueva',
                'guardada exitosamente',
                'success'
              )
      });
      this.ResetInputs();

  }

  getPageHtml() {
   // console.log(this.shortcuts);
    let ArregloCadenasEditor = this.shortcuts.split('</p><p>');
    console.log(ArregloCadenasEditor);
    for (let i = 0; i < ArregloCadenasEditor.length; i++) {
      const line = ArregloCadenasEditor[i];
      if (line.includes("{") && line.includes("}")) {
        let cadena = this.limpiar(line);
        console.log("es un json:", cadena);
        let json = JSON.parse(cadena);
        if (json != undefined) {
          if (json.tipo != undefined) {
            this.montarHTML(json,i);
          }
        }
      } else {
        if (line != "&nbsp") {
          let texto = this.dropEtiqueta(line);
          console.log("es texto:", texto);
          let html = { html: `<p>${texto}</p>`, orden: i };
          this.paginaEstaticaService
            .actualizarShortcuts(this.idActual, html)
            .subscribe((res) => console.log(res));
        }
      }
    }
   /*  ArregloCadenasEditor.forEach(line => {
      //let cadena = this.limpiar(line);
      if (line.includes('{') && line.includes('}')){
        let cadena = this.limpiar(line);
        console.log("es un json:",cadena);
        let json = JSON.parse(cadena);
        if (json != undefined) {
          if (json.tipo != undefined) {
            this.montarHTML(json);
          }
        }
      }
      else {
        if (line !="&nbsp") {
          let texto = this.dropEtiqueta(line);
          console.log("es texto:", texto);
          let html = { html: `<p>${texto}</p>`};
        this.paginaEstaticaService.actualizarShortcuts(this.idActual, html).subscribe(res => console.log(res));
        }

      }
    }); */
  }

  limpiar(str: string): any {
    str = str.replace(/&nbsp;/g, " ");
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  dropEtiqueta(str:String){
    return str.replace('<p>', "");
  }

 montarHTML(json, orden) {
  let html:any;
  if (json.tipo == 'imagen') {
    if (json.id != undefined) {
      this.archivosService.obtenerUnArchivo(json.id)
      .subscribe(res=>{
        html = {
          html: `<div class="row-cols-12 d-flex justify-content-center"> 
          <img class=" imagenGenerada img-fluid " src="http://localhost:8888${res.accesoRoute}"  class="img-fluid form-control">
           <br>
          </div>`,
          orden: orden
        };
        this.paginaEstaticaService.actualizarShortcuts(this.idActual, html).subscribe(res=>console.log(res));
      });
    }

  }

   if (json.tipo == 'video') {
     if (json.id != undefined) {
       this.archivosService.obtenerUnArchivo(json.id)
         .subscribe(res => {
           html = {
             html: `<video src="http://localhost:8888${res.accesoRoute}"  width="100%" height="480" autoplay loop mute class="pt-4 pb-4"></video>`,
             orden: orden
           };
           this.paginaEstaticaService.actualizarShortcuts(this.idActual, html).subscribe(res => console.log(res));
         });
     }

   }

    if (json.tipo == 'enlace') {
       if (json.id != undefined) {
           this.archivosService.obtenerUnArchivo(json.id)
           .subscribe(res => {
             html = {
               html: `<a href="${res.accesoRoute}" download>${res.nombre}</a><br>`,
               orden: orden
             };
             this.paginaEstaticaService.actualizarShortcuts(this.idActual, html).subscribe(res => console.log(res));
           });
       }
     }

   if (json.tipo == 'galeria') {
     if (json.imagenes != undefined) {
      json.imagenes.forEach(e => {
         this.archivosService.obtenerUnArchivo(e)
           .subscribe(res => {
             html = { url: res.accesoRoute} ;
             this.paginaEstaticaService.actualizarGaleria(this.idActual, html).subscribe(res => console.log(res));
            });
      });
     }
   }

   if (json.tipo == "post") {
     if (json.id != undefined) {
      this.paginaPostService.obtenerPost(json.id).subscribe((res) => {
        console.log("esta es respuesta de post service: ",res);
        /* let data={
          _id:res._id,
          comentarios:res.comentarios,
          TituloEntrada:res.TituloEntrada,
          Autor:res.Autor,
          PalabrasClave:res.PalabrasClave,
          contenido:res.contenido,
          permitirComentarios:res.permitirComentarios,
          categoria:res.categoria,
          RutaAccesoImagen:res.RutaAccesoImagen
        } */
        let data = {
          "idPost": res._id,
        };
        this.paginaEstaticaService
          .actualizarPosts(this.idActual, data)
          .subscribe((res) =>
            console.log("esta es respuesta de pagina estatica: ", data)
          );
      });
        }
      }
   }
   
 }

