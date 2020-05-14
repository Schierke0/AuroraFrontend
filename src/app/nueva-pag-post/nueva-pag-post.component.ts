import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-nueva-pag-post',
  templateUrl: './nueva-pag-post.component.html',
  styleUrls: ['./nueva-pag-post.component.css']
})
export class NuevaPagPostComponent implements OnInit {

  constructor() { }
  public Editor = ClassicEditor;
  ngOnInit(): void {
  }
  contenido:string;
  TituloEntrada:string;
  Autor:string;
  PalabrasClave:string;
  PermitirComentarios:boolean= false;
  label= 'Permitir comentarios';


 changeSelection() {
    if (!this.PermitirComentarios) {
      this.PermitirComentarios=true;
    }
    else{
      this.PermitirComentarios = false;}
    //console.log("permitir comentarios:"+this.PermitirComentarios);
  }


  guardar(){
    var nuevaPagPost: any = {
      TituloEntrada: this.TituloEntrada,
      Autor: this.Autor,
      PalabrasClave: this.PalabrasClave,
      contenido: this.limpiar(this.contenido),
      comentarios:this.PermitirComentarios
    }
    console.log(nuevaPagPost);
  }
  limpiar(str: string): any {
    str = str.replace(/&nbsp;/g, " ");
    return str.replace(/<[^>]*>/g, "");
  }
}
