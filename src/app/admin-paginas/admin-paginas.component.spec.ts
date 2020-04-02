import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaginasComponent } from './admin-paginas.component';

describe('AdminPaginasComponent', () => {
  let component: AdminPaginasComponent;
  let fixture: ComponentFixture<AdminPaginasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaginasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
