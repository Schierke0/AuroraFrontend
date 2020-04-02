import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPagEstaticaComponent } from './nueva-pag-estatica.component';

describe('NuevaPagEstaticaComponent', () => {
  let component: NuevaPagEstaticaComponent;
  let fixture: ComponentFixture<NuevaPagEstaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPagEstaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPagEstaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
