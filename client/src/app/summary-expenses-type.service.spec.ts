import { TestBed, inject } from '@angular/core/testing';

import { SummaryExpensesTypeService } from './summary-expenses-type.service';

describe('SummaryExpensesTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryExpensesTypeService]
    });
  });

  it('should be created', inject([SummaryExpensesTypeService], (service: SummaryExpensesTypeService) => {
    expect(service).toBeTruthy();
  }));
});
