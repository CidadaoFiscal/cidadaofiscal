import { TestBed, inject } from '@angular/core/testing';

import { SummaryMemberService } from './summary-member.service';

describe('SummaryMemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummaryMemberService]
    });
  });

  it('should be created', inject([SummaryMemberService], (service: SummaryMemberService) => {
    expect(service).toBeTruthy();
  }));
});
