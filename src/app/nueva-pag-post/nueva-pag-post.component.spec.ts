import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPagPostComponent } from './nueva-pag-post.component';

describe('NuevaPagPostComponent', () => {
  let component: NuevaPagPostComponent;
  let fixture: ComponentFixture<NuevaPagPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPagPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPagPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
