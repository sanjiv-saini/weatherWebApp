import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IWeather, IForecast } from '../weather-data/weather';

@Injectable()
export class WeatherDataService {

  constructor(private _http: Http) { }

  private fetchUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  private apiKey = 'de4ed9529200f62b0400f5818f1cdbd7';
  private unit = 'metric';

  // https://api.openweathermap.org/data/2.5/forecast?q=London,us&units=metric&APPID=de4ed9529200f62b0400f5818f1cdbd7
  getWeatherData(city: string, country: string): Observable<IWeather> {
    const url =  `${this.fetchUrl}?q=${city},${country}&units=${this.unit}&APPID=${this.apiKey}`;
    return this._http.get(url).map((response: Response) => this.parseResponse(response));
  }

  /**
   * Parse the response from api for application consistency
   * @param response data received from api
   */
  private parseResponse(response: Response): IWeather {
    const responseJson = JSON.parse(response.text());
    const forecastList: IForecast[] = [];
    let skipDate = '';
    let id = 0;

    for (const item of responseJson.list) {
      // for a single day we get forecast of different time with a gap of 3 hrs
      // we consider only the first forcast of the day
      if (skipDate === item.dt_txt.split(' ')[0]) {
        if (item.main.temp_max > forecastList[forecastList.length - 1].temp_max) {
          forecastList[forecastList.length - 1].temp_max = item.main.temp_max;
        }
        if (item.main.temp_min < forecastList[forecastList.length - 1].temp_min) {
          forecastList[forecastList.length - 1].temp_min = item.main.temp_min;
        }
        continue;
      }
      skipDate = item.dt_txt.split(' ')[0];

      const forecastInst: IForecast = {
        'index' : id++,
        'temp' : item.main.temp,
        'temp_min' : item.main.temp_min,
        'temp_max' : item.main.temp_max,
        'pressure' : item.main.pressure,
        'humidity' : item.main.humidity,
        'weatherType' : item.weather[0].main,
        'description' : item.weather[0].description,
        'wind' : item.wind.speed,
        'day' : this.getDay(item.dt)
      };

      forecastList.push(forecastInst);
    }

    const weatherData: IWeather = {
      'city' : responseJson.city.name,
      'country' : responseJson.city.country,
      'forecastList' : forecastList
    };

    return weatherData;
  }

  /**
   * Based on given time return the day
   * @param timeInSec time for which day has to be calculated
   */
  private getDay(timeInSec: number): string {
    const currDate: Date = new Date();
    const givenDate: Date = new Date(timeInSec * 1000);

    if (currDate.getUTCDate() === givenDate.getUTCDate()) {
      return 'Today';
    } else if (givenDate.getUTCDate() - currDate.getUTCDate() === 1) {
      return 'Tomorrow';
    } else {
      return this.getDayInString(givenDate.getUTCDay());
    }
  }

  /**
   * It return the day in string for given day number
   * @param dayNum day number between [0-6]
   */
  getDayInString(dayNum: number): string {
    switch (dayNum) {
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
      default: return '';
    }
  }
}
