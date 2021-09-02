import { TestBed } from '@angular/core/testing';

import { CallWeatherService } from './call-weather.service';

describe('CallWeatherService', () => {
  let service: CallWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
