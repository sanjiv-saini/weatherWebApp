import { TestBed, inject } from '@angular/core/testing';

import { WeatherDataService } from './weather-data.service';
import { environment } from '../../environments/environment';
import { parsedJson, responseJson } from './mockData';
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

  it('should return properly parsed data for given response data', inject([WeatherDataService], (service: WeatherDataService) => {
    expect(service.parseResponse(responseJson)).toEqual(parsedJson);
  }));

});
