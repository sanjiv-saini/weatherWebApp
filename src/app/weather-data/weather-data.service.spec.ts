import { TestBed, inject } from '@angular/core/testing';

import { WeatherDataService } from './weather-data.service';
import { HttpClient } from 'selenium-webdriver/http';

describe('WeatherDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClient ],
      providers: [ WeatherDataService ]
    });
  });

  it('should be created', inject([WeatherDataService], (service: WeatherDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return right day for given day number', inject([WeatherDataService], (service: WeatherDataService) => {
    const days: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ''];
    for (let i = 0; i < 8; i++) {
      expect(service.getDayInString(i)).toBe(days[i]);
    }
  }));
});
