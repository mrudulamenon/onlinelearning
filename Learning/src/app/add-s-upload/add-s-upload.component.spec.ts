import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSUploadComponent } from './add-s-upload.component';

describe('AddSUploadComponent', () => {
  let component: AddSUploadComponent;
  let fixture: ComponentFixture<AddSUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
