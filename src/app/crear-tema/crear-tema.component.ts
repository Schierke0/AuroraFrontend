import { Component, OnInit } from '@angular/core';
import { ColorPickerControl } from '@iplab/ngx-color-picker';

@Component({
  selector: "app-crear-tema",
  templateUrl: "./crear-tema.component.html",
  styleUrls: ["./crear-tema.component.css"],
})
export class CrearTemaComponent implements OnInit {
  public compactControl = new ColorPickerControl();
  constructor() {}

  ngOnInit(): void {}
}
