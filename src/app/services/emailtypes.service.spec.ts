import { TestBed } from '@angular/core/testing';

import { EmailtypesService } from './emailtypes.service';

describe('EmailtypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailtypesService = TestBed.get(EmailtypesService);
    expect(service).toBeTruthy();
  });
});
