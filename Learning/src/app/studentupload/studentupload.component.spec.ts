import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentuploadComponent } from './studentupload.component';

describe('StudentuploadComponent', () => {
  let component: StudentuploadComponent;
  let fixture: ComponentFixture<StudentuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
