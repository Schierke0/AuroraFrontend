import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor() {}

  login: boolean = false;
  registro: boolean = true;
  ngOnInit(): void {}
  cambiarPanelLogin() {
    this.login=true;
    this.registro = false;
  }
  cambiarPanelRegistro() {
    this.login = false;
    this.registro = true;
  }
}
