import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ArchivosService } from "../servicios/archivos.service";
import { PaginaPostService } from "../servicios/pagina-post.service";
import { CategoriaService } from '../servicios/categoria.service';
import Swal from "sweetalert2";

@Component({
  selector: "app-nueva-pag-post",
  templateUrl: "./nueva-pag-post.component.html",
  styleUrls: ["./nueva-pag-post.component.css"],
})
export class NuevaPagPostComponent implements OnInit {
  constructor(private archivosService: ArchivosService,
    private paginaPostService:PaginaPostService,
    private categoriaService: CategoriaService) {}

  public Editor = ClassicEditor;
  categorias:any=[];
  opcionSeleccionado: string = "0"; // Iniciamos
  verSeleccion: string = "";

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe((res:any)=>{
     this.categorias= res;
      console.log(this.categorias)
    });

  }

  contenido: string;
  TituloEntrada: string;
  Autor: string;
  PalabrasClave: string;
  PermitirComentarios: boolean = false;
  uploadedFiles: Array<File>;
  label = "Permitir comentarios";
  categoria:string;
  ruta:string;

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    //console.log(this.uploadedFiles);
  }

  guardar() {
    if (this.uploadedFiles != undefined) {
      let formData = new FormData();
      formData.append("file", this.uploadedFiles[0]);
      this.archivosService.guardarArchivo(formData).subscribe((res: any) => {
        this.ruta = res.ArchivoGuardado.accesoRoute;
        this.enviarDatos();
      });
    }
  }

  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
   console.log("selecciono",this.opcionSeleccionado);
  }

  changeSelection() {
    if (!this.PermitirComentarios) {
      this.PermitirComentarios = true;
    } else {
      this.PermitirComentarios = false;
    }
    //console.log("permitir comentarios:"+this.PermitirComentarios);
  }

  enviarDatos() {
    var nuevaPagPost: any = {
      TituloEntrada: this.TituloEntrada,
      Autor: this.Autor,
      PalabrasClave: this.PalabrasClave,
      contenido: this.limpiar(this.contenido),
      permitirComentarios: this.PermitirComentarios,
      categoria: this.opcionSeleccionado,
      RutaAccesoImagen: this.ruta,
    };
    this.paginaPostService.crearPost(nuevaPagPost).subscribe((res: any) => {
    this.TituloEntrada='';
    this.Autor='';
    this.PalabrasClave='';
    this.contenido='';
    this.PermitirComentarios=false;
    this.opcionSeleccionado='';
    this.ruta='';

      Swal.fire(
        "Tu archivo se ha cargado",
        res.ArchivoGuardado.TituloEntrada,
        "success"
      );
    });
    //console.log(nuevaPagPost);
  }
  limpiar(str: string): any {
    str = str.replace(/&nbsp;/g, " ");
    return str.replace(/<[^>]*>/g, "");
  }
}
