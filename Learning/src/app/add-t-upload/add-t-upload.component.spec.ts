import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTUploadComponent } from './add-t-upload.component';

describe('AddTUploadComponent', () => {
  let component: AddTUploadComponent;
  let fixture: ComponentFixture<AddTUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
