import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTemaComponent } from './crear-tema.component';

describe('CrearTemaComponent', () => {
  let component: CrearTemaComponent;
  let fixture: ComponentFixture<CrearTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
