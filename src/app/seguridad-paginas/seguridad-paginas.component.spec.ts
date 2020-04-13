import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadPaginasComponent } from './seguridad-paginas.component';

describe('SeguridadPaginasComponent', () => {
  let component: SeguridadPaginasComponent;
  let fixture: ComponentFixture<SeguridadPaginasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguridadPaginasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
