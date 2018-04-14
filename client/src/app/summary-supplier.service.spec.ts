import { TestBed, inject } from '@angular/core/testing';

import { SummarySupplierService } from './summary-supplier.service';

describe('SummarySupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummarySupplierService]
    });
  });

  it('should be created', inject([SummarySupplierService], (service: SummarySupplierService) => {
    expect(service).toBeTruthy();
  }));
});
