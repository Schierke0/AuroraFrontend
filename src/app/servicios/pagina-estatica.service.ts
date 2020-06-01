import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PaginaEstaticaService {
  constructor(private httpClient: HttpClient) {}

  crearPagina(data) {
    return this.httpClient.post("http://localhost:8888/paginaEstatica", data);
  }
  actualizarShortcuts(idPagina, shortcut) {
    return this.httpClient.put(
      `http://localhost:8888/paginaEstatica/shortcuts/${idPagina}`,
      shortcut
    );
  }
  actualizarGaleria(idPagina, url) {
    return this.httpClient.put(
      `http://localhost:8888/paginaEstatica/shortcuts/${idPagina}/galeria`,
      url
    );
  }
  actualizarPosts(idPagina, post) {
    return this.httpClient.put(
      `http://localhost:8888/paginaEstatica/shortcuts/${idPagina}/post`,
      post
    );
  }

  obtenerPaginas(): Observable<any> {
    return this.httpClient.get("http://localhost:8888/paginaEstatica");
  }

  obtenerPagina(id): Observable<any> {
    return this.httpClient.get(`http://localhost:8888/paginaEstatica/${id}`);
  }

  actualizarPagina(id, data) {
    return this.httpClient.put(
      `http://localhost:8888/paginaEstatica/${id}`,
      data
    );
  }
  eliminarPagina(id) {
    return this.httpClient.delete(`http://localhost:8888/paginaEstatica/${id}`);
  }
}
