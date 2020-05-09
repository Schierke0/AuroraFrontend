import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
declare var $: any;
@Component({
  selector: 'app-nueva-pag-estatica',
  templateUrl: './nueva-pag-estatica.component.html',
  styleUrls: ['./nueva-pag-estatica.component.css']
})
export class NuevaPagEstaticaComponent implements OnInit {
//codigos: C001=pagina activa, C002= incluir encambezado, C003= incluir pie de pagina
  constructor() { }
  public Editor = ClassicEditor;

  ngOnInit(): void {
    this.fetchSelectedItems()
    this.fetchCheckedIDs()
  }
  Titulo:string;
  TituloMenu: string;
  PaginaPadre:string;
  Url:string;
  PalabrasClave:string;
  Descripcion:string;
  shortcuts:string;

  selectedItemsList = [];
  checkedIDs:any = {
    EstadoPagina:false,
    Encabezado:false,
    PiePagina:false
  };
  checkboxesDataList = [
    {
      id: 'EstadoPagina',
      label: 'Estado de la pagina activo',
      isChecked: false
    },
    {
      id: 'Encabezado',
      label: 'Incluir encabezado',
      isChecked: false
    },
    {
      id: 'PiePagina',
      label: 'Incluir pie de pagina',
      isChecked: false
    },
  ]

  changeSelection() {
    this.fetchSelectedItems()
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs() {
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs[value.id]=true;
      }
    });
  }

  limpiar(str: string): any {
    str = str.replace(/&nbsp;/g, " ");
    return str.replace(/<[^>]*>/g, "");
  }

  guardar() {
    this.fetchCheckedIDs();
    var PaginaEstatica: any = {
      Titulo: this.Titulo,
      TituloMenu: this.TituloMenu,
      PaginaPadre: this.PaginaPadre,
      Url: this.Url,
      PalabrasClave: this.PalabrasClave,
      Descripcion: this.Descripcion,
      shortcuts: this.limpiar(this.shortcuts),
      opciones: this.checkedIDs
    }
    console.log(PaginaEstatica);


   // console.log(this.checkedIDs);

  }

}



