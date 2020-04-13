import { Component, OnInit } from '@angular/core';
import { ColorPickerControl } from "@iplab/ngx-color-picker";

@Component({
  selector: "app-pagina-principal",
  templateUrl: "./pagina-principal.component.html",
  styleUrls: ["./pagina-principal.component.css"],
})
export class PaginaPrincipalComponent implements OnInit {
  constructor() {}
  public compactControl = new ColorPickerControl();
  public compactControl1 = new ColorPickerControl();
  public compactControl2 = new ColorPickerControl();
  public compactControl3 = new ColorPickerControl();

  ngOnInit(): void {}
}
