import { TestBed, inject } from '@angular/core/testing';

import { WeatherDataService } from './weather-data.service';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('WeatherDataService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ WeatherDataService ]
    });

  });

  it('should be created', inject([WeatherDataService], (service: WeatherDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return right day for given day number', inject([WeatherDataService], (service: WeatherDataService) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ''];
    for (let i = 0; i < 8; i++) {
      expect(service.getDayInString(i)).toBe(days[i]);
    }
  }));

  it('should give correct day for given time in seconds', inject([WeatherDataService], (service: WeatherDataService) => {
  const today = new Date();
    expect(service.getDay(today.getTime() / 1000)).toEqual('Today');

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  expect(service.getDay(tomorrow.getTime() / 1000)).toEqual('Tomorrow');

  for (let i = 2; i < 7; i++) {
    const nextDay = new Date();
    nextDay.setDate(today.getDate() + i);
    expect(service.getDay(nextDay.getTime() / 1000)).toEqual(service.getDayInString(nextDay.getDay()));
  }
  }));

});
