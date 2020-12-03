import { TestBed } from '@angular/core/testing';

import { ViajeService } from './services/viaje.service';

describe('ViajeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViajeService = TestBed.get(ViajeService);
    expect(service).toBeTruthy();
  });
});
