import { TestBed } from '@angular/core/testing';

import { TeacherUploadService } from './teacher-upload.service';

describe('TeacherUploadService', () => {
  let service: TeacherUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
