import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class PaginaPostService {
  constructor(private httpClient: HttpClient) {}

  crearPost(data): Observable<any> {
    return this.httpClient.post("http://localhost:8888/paginaPost", data);
  }

  obtenerPosts(): Observable<any> {
    return this.httpClient.get("http://localhost:8888/paginaPost");
  }
  obtenerPost(id): Observable<any> {
    return this.httpClient.get(`http://localhost:8888/paginaPost/${id}`);
  }
  actualizarPost(id, data) {
    return this.httpClient.put(`http://localhost:8888/paginaPost/${id}`, data);
  }
  eliminarPost(id) {
    return this.httpClient.delete(`http://localhost:8888/paginaPost/${id}`);
  }
  obtenerTodosComentarios(): Observable<any> {
    return this.httpClient.get("http://localhost:8888/paginaPost/comentarios");
  }
  agregarComentario(idPost, dataComentario): Observable<any> {
    return this.httpClient.put(
      `http://localhost:8888/paginaPost/${idPost}/comentario`,
      dataComentario
    );
  }
  eliminarComentario(idPost, idComentario): Observable<any> {
    return this.httpClient.delete(
      `http://localhost:8888/paginaPost/${idPost}/${idComentario}/eliminar`
    );
  }
  cambiarEstadoComentario(idPost, idComentario, data): Observable<any> {
    return this.httpClient.put(
      `http://localhost:8888/paginaPost/${idPost}/${idComentario}/actualizar`, data
    );
  }
}
