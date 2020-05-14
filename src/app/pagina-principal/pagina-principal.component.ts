import { Component, OnInit } from '@angular/core';
import { ColorPickerControl } from "@iplab/ngx-color-picker";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {HttpClient} from '@angular/common/http';
@Component({
  selector: "app-pagina-principal",
  templateUrl: "./pagina-principal.component.html",
  styleUrls: ["./pagina-principal.component.css"],
})
export class PaginaPrincipalComponent implements OnInit {

  constructor(private httpClient: HttpClient) {}

  public compactControl = new ColorPickerControl();
  public compactControl1 = new ColorPickerControl();
  public compactControl2 = new ColorPickerControl();
  public compactControl3 = new ColorPickerControl();
  public Editor = ClassicEditor;

  ngOnInit(): void {}

  css: string;
  js: string;
  TituloPagina: string;
  PalabrasClave: string;
  colorFondo: string = this.compactControl.value.toHexString();
  colorTexto: string = this.compactControl1.value.toHexString();
  colorHeadFoot: string = this.compactControl2.value.toHexString();
  colorIcono: string = this.compactControl3.value.toHexString();

  public filesToUpload: any;

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  mostrarArvhivo() {
    //Aqui ya tienes el archivo en binario en la variable this.filesToUpload
    // y puedes hacer con el lo que quieras
    console.log(this.filesToUpload);
    this.httpClient.post(
      "http://localhost:8888/archivos",
      this.filesToUpload
    );
  }

  guardar() {
    var paginaPrincipal: any = {
      css: this.limpiar(this.css),
      js: this.limpiar(this.js),
      TituloPagina: this.TituloPagina,
      PalabrasClave: this.PalabrasClave,
      colorFondo: this.colorFondo,
      colorTexto: this.colorTexto,
      colorHeadFoot: this.colorHeadFoot,
      colorIcono: this.colorIcono,
    };
    console.log(paginaPrincipal);

  }

  limpiar(str: string): any {
    str = str.replace(/&nbsp;/g, " ");
    return str.replace(/<[^>]*>/g, "");
  }
}
