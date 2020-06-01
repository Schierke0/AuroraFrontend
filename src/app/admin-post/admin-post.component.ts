import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../servicios/categoria.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
@Component({
  selector: "app-admin-post",
  templateUrl: "./admin-post.component.html",
  styleUrls: ["./admin-post.component.css"],
})
export class AdminPostComponent implements OnInit {
  constructor(
    private categoriaService: CategoriaService,
    private modalService: NgbModal
  ) {}
  categorias: any = [];
  nombreCategoria: String;
  idCategoriaActual:String;
  nuevoNombre:String;

  ngOnInit(): void {
    this.cargarCategorias();
  }
  cargarCategorias() {
    this.categoriaService.obtenerCategorias().subscribe((res: any) => {
      this.categorias = res;
    });
  }
  eliminarCategoria(idCategoria, nombreCategoria) {
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
        this.categoriaService
          .eliminarCategoria(idCategoria)
          .subscribe((res) => {
            console.log(res);
            this.cargarCategorias();
            Swal.fire("Categoria eliminada", nombreCategoria, "success");
          });
      }
    });
    console.log(idCategoria);
  }
  modalActualizar(idCategoria, nombreModal) {
    this.modalService.open(nombreModal);
    this.idCategoriaActual = idCategoria;
    //this.categoriaService.actualizarCategoria
  }
  actualizarCategoria(){
    let data = {
      nombreCategoria: this.nuevoNombre,
    };
    this.categoriaService
      .actualizarCategoria(this.idCategoriaActual, data)
      .subscribe((res: any) => {
        console.log(res);
        this.cargarCategorias();
        this.nuevoNombre = "";
        this.idCategoriaActual = "";
        this.modalService.dismissAll();
        Swal.fire("Categoria actualizada con exito", "", "success");
      });
  }

  nuevaCategoria() {
    let data = {
      nombreCategoria: this.nombreCategoria,
    };
    this.categoriaService.crearCategoria(data).subscribe((res: any) => {
      this.nombreCategoria = "";
      this.cargarCategorias();
      console.log(res);
      Swal.fire(
        "Tu archivo se ha cargado",
        res.ArchivoGuardado.nombreCategoria,
        "success"
      );
    });
  }
}
