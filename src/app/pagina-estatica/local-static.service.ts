import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStaticService {
  constructor() {}
  private idPaginaEstatica: String;

  getId(): String {
    return this.idPaginaEstatica;
  }
  actualizarId(idPaginaEstatica) {
    this.idPaginaEstatica = idPaginaEstatica;
  }
}
