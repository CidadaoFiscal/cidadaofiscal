import { TestBed, inject } from '@angular/core/testing';

import { SummaryExpensesYearService } from './summary-expenses-year.service';

describe('SummaryExpensesYearService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryExpensesYearService]
    });
  });

  it('should be created', inject([SummaryExpensesYearService], (service: SummaryExpensesYearService) => {
    expect(service).toBeTruthy();
  }));
});
