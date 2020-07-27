import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheruploadComponent } from './teacherupload.component';

describe('TeacheruploadComponent', () => {
  let component: TeacheruploadComponent;
  let fixture: ComponentFixture<TeacheruploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacheruploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacheruploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
