import { Component, OnInit } from '@angular/core';
import { ArchivosService } from '../servicios/archivos.service';
import Swal from 'sweetalert2'
import { PaginaPostService } from '../servicios/pagina-post.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { CategoriaService } from '../servicios/categoria.service';

@Component({
  selector: "app-recursos",
  templateUrl: "./recursos.component.html",
  styleUrls: ["./recursos.component.css"],
})
export class RecursosComponent implements OnInit {
  constructor(
    private archivosService: ArchivosService,
    private paginaPostService: PaginaPostService,
    private modalService: NgbModal,
    private categoriaService: CategoriaService
  ) {}
  ver: boolean = false;
  archivos = []; 
  //para respuestas del servidor
  compresos: any = [];
  posts: any = [];
  excels: any = [];
  imagenes: any = [];
  otros: any = [];
  pdfs: any = [];
  presentaciones: any = [];
  textos: any = [];
  videos: any = [];
  words: any = [];
  visualizar = "imagenes";
  categorias: any = [];
  LabelArchivo = "Selecione un archivo";
  //para actualizar posts
  tituloPost: string = "";
  palabrasPost: string = "";
  contenidoPost: string = "";
  opcionSeleccionado: string = "0"; // Iniciamos
  verSeleccion: string = "";
  idPostActual;

  ngOnInit(): void {
    this.inicializacion();
    this.categoriaService.obtenerCategorias().subscribe((res: any) => {
      this.categorias = res;
    });
  }

  uploadedFiles: Array<File>;

  inicializacion() {
    this.compresos = [];
    this.excels = [];
    this.imagenes = [];
    this.otros = [];
    this.pdfs = [];
    this.presentaciones = [];
    this.textos = [];
    this.videos = [];
    this.words = [];
    this.posts = [];
    this.paginaPostService.obtenerPosts().subscribe((res: any) => {
      this.posts = res;
    });
    this.archivosService.obtenerArchivos().subscribe((res) => {
      this.archivos = Array.of(res);
      this.archivos = this.archivos[0];
      this.llenarDatosArchivos();
    });
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.LabelArchivo = element.target.files[0].name;
  }

  eliminarArchivo(id, nombre) {
    Swal.fire({
      title: "¿Seguro quieres eliminar el archivo?",
      text: "No puedes reestablecerlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.value) {
        this.archivosService.eliminarUnArchivo(id).subscribe((res) => {
          //console.log(res);
          this.inicializacion();
          Swal.fire("Archivo eliminado", nombre, "success");
        });
      }
    });
  }

  upload() {
    let formData = new FormData();
    formData.append("file", this.uploadedFiles[0]);
    this.archivosService.guardarArchivo(formData).subscribe((res) => {
      Swal.fire(
        "Tu archivo se ha cargado",
        res.ArchivoGuardado.nombre,
        "success"
      );
      this.inicializacion();
      this.LabelArchivo = "Selecione un archivo";
      this.modalService.dismissAll();
    });
  }

  llenarDatosArchivos() {
    this.archivos.forEach((e) => {
      //console.log(e.categoria);
      switch (e.categoria) {
        case "compresos":
          this.compresos.push(e);
          break;
        case "excels":
          this.excels.push(e);
          break;
        case "img":
          this.imagenes.push(e);
          break;
        case "otros":
          this.otros.push(e);
          break;
        case "pdf":
          this.pdfs.push(e);
          break;
        case "presentaciones":
          this.presentaciones.push(e);
          break;
        case "texto":
          this.textos.push(e);
          break;
        case "videos":
          this.videos.push(e);
          break;
        case "word":
          this.words.push(e);
          break;

        default:
          break;
      }
    });
    this.invertirResultados();
  }

  invertirResultados(){
    this.compresos=this.compresos.reverse();
    this.excels=this.excels.reverse();
    this.imagenes=this.imagenes.reverse();
    this.otros=this.otros.reverse();
    this.pdfs=this.pdfs.reverse();
    this.presentaciones=this.presentaciones.reverse();
    this.textos=this.textos.reverse();
    this.videos=this.videos.reverse();
    this.words = this.words.reverse();
  }
  eliminarPost(idPost, tituloPost) {
    //console.log("Eliminar Post", idPost, tituloPost);
    Swal.fire({
      title: "¿Seguro quieres eliminar la categoria?",
      text: "No puedes reestablecerlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.value) {
        this.paginaPostService.eliminarPost(idPost).subscribe((res) => {
          console.log(res);
          this.inicializacion();
          Swal.fire("Post eliminado", tituloPost, "success");
        });
      }
    });
  }
  modalActualizarPost(idPost, nombreModal) {
    this.idPostActual = idPost;
    this.paginaPostService.obtenerPost(idPost).subscribe((res: any) => {
      this.tituloPost = res.TituloEntrada;
      this.palabrasPost = res.PalabrasClave;
      this.contenidoPost = res.contenido;
      this.opcionSeleccionado = res.categoria;
    });
    this.modalService.open(nombreModal, { size: "lg" });
  }
  actualizarPost() {
    let datos = {
      TituloEntrada: this.tituloPost,
      PalabrasClave: this.palabrasPost,
      contenido: this.contenidoPost,
      categoria: this.opcionSeleccionado,
    };
    this.paginaPostService
      .actualizarPost(this.idPostActual, datos)
      .subscribe((res) => {
        this.tituloPost = "";
        this.palabrasPost = "";
        this.contenidoPost = "";
        this.opcionSeleccionado = "";
        this.modalService.dismissAll();
        this.inicializacion();
        Swal.fire("Post Actualizado", "", "success");
      });
  }
  abrirModal(modalUpload) {
    this.modalService.open(modalUpload);
  }
  capturar() {
    this.verSeleccion = this.opcionSeleccionado;
    //console.log("selecciono", this.opcionSeleccionado);
  }
}
