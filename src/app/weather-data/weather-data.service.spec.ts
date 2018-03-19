import { TestBed, inject } from '@angular/core/testing';

import { WeatherDataService } from './weather-data.service';
import { HttpModule } from '@angular/http';

describe('WeatherDataService', () => {
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [WeatherDataService]
    });
  });

  it('should be created', inject([WeatherDataService], (service: WeatherDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return right day for given day number', inject([WeatherDataService], (service: WeatherDataService) => {
    let days: any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ''];
    for(let i=0; i<8; i++){
      expect(service.getDayInString(i)).toBe(days[i]);
    }
  }));
});
