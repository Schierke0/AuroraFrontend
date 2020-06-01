import { Component, OnInit } from '@angular/core';
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { PaginaEstaticaService } from '../servicios/pagina-estatica.service';
import { LocalStaticService } from "./local-static.service";
import { PaginaPostService } from '../servicios/pagina-post.service';

@Component({
  selector: "app-pagina-estatica",
  templateUrl: "./pagina-estatica.component.html",
  styleUrls: ["./pagina-estatica.component.css"],
})
export class PaginaEstaticaComponent implements OnInit {
  constructor(
    private paginaEstaticaService: PaginaEstaticaService,
    private localStaticService: LocalStaticService,
    private postService: PaginaPostService
  ) {}
  faComment = faComment;
  faInstagram = faInstagram;
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  idPaginaActual;
  datosPagina: any;
  shortcutsArray: any = [];
  cargado: boolean = false;
  posts: any = [];
  carrouselExiste: boolean = false;
  postExiste: boolean = false;
  fechaActual: String;
  comentarios: any = [];
  comentario: String = "";
  images = [];
  arraDebg: any = [];

  ngOnInit(): void {
    this.idPaginaActual = this.localStaticService.getId();

    this.cargarComponentes(this.idPaginaActual);
    let meses = new Array(
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    );
    let f = new Date();
    this.fechaActual =
      f.getDate() + " " + meses[f.getMonth()] + "-" + f.getFullYear();
  }
  cargarComponentes(idPagina) {
    this.paginaEstaticaService.obtenerPagina(idPagina).subscribe((res: any) => {
      this.datosPagina = res;
      if (res.galeria.length != 0) {
        res.galeria.forEach((e) => {
          this.images.push(e.url);
        });
        this.carrouselExiste = true;
      }
      /*  */
      this.shortcutsArray = res.shortcuts.sort(function (a, b) {
        if (a.orden > b.orden) {
          return 1;
        }
        if (a.orden < b.orden) {
          return -1;
        }
        return 0;
      });

      this.cargarPosts();
      this.cargado = true;
    });
  }
  comentar(idPost) {
    let data = {
      comentario: this.comentario,
      usuario: "Pablo Lorenzo",
      urlImagen: "/archivosPublicos/users/52k60.jpg",
      fecha: this.fechaActual,
    };
    this.postService.agregarComentario(idPost, data).subscribe((res: any) => {
      this.comentarios.push(data);
      this.comentario = "";
    });
  }
  cargarPosts() {
    this.datosPagina.posts.forEach((e) => {
      this.postService.obtenerPost(e.idPost).subscribe((res: any) => {
        this.postExiste = true;
        this.comentarios = res.comentarios;
        this.posts.push(res);
      });
    });
  }
  obtenerSource(parte) {
    return `url('http://localhost:8888${parte}')`;
  }
  obtenerUrl(parte) {
    return `http://localhost:8888${parte}`;
  }
}

