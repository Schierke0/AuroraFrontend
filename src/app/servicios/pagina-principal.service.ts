import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PaginaPrincipalService {
  constructor(private httpClient: HttpClient) {}

  guardarPaginaPrincipal(data) {
    return this.httpClient.post("http://localhost:8888/paginaPrincipal", data);
  }

  obtenerPaginaPrincipal(): Observable<any> {
    return this.httpClient.get("http://localhost:8888/paginaPrincipal");
  }

  actualizarPaginaPrincipal(data, idPagina): Observable<any> {
    return this.httpClient.put(`http://localhost:8888/paginaPrincipal/${idPagina}`,
      data
    );
  }
}
