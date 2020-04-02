import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarTemaComponent } from './seleccionar-tema.component';

describe('SeleccionarTemaComponent', () => {
  let component: SeleccionarTemaComponent;
  let fixture: ComponentFixture<SeleccionarTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
