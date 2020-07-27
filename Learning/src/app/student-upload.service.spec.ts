import { TestBed } from '@angular/core/testing';

import { StudentUploadService } from './student-upload.service';

describe('StudentUploadService', () => {
  let service: StudentUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
