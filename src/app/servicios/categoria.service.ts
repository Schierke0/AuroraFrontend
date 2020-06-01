import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CategoriaService {
  constructor(private httpClient: HttpClient) {}

  crearCategoria(data) {
    return this.httpClient
      .post("http://localhost:8888/categoria", data);

  }

  obtenerCategorias(): Observable<any> {
    return this.httpClient.get("http://localhost:8888/categoria");
  }
  obtenerCategoria(id): Observable<any> {
    return this.httpClient.get(`http://localhost:8888/categoria/${id}`);
  }
  actualizarCategoria(id, data) {
    return this.httpClient.put(`http://localhost:8888/categoria/${id}`, data);
  }
  eliminarCategoria(id) {
    return this.httpClient.delete(`http://localhost:8888/categoria/${id}`);
  }
}
