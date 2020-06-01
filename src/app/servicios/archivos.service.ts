import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArchivosService {
  constructor(private httpClient: HttpClient) {}

  guardarArchivo(data): Observable<any> {
    return this.httpClient.post("http://localhost:8888/archivos", data);
  }
  obtenerArchivos(): Observable<any> {
    return this.httpClient.get("http://localhost:8888/archivos");
  }
  obtenerUnArchivo(idArchivo): Observable<any> {
    return this.httpClient.get(`http://localhost:8888/archivos/${idArchivo}`);
  }
  eliminarUnArchivo(idArchivo): Observable<any> {
    return this.httpClient.delete(`http://localhost:8888/archivos/${idArchivo}`);
  }
}



