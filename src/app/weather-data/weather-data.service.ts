import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { IWeather, IForecast } from '../weather-data/weather';

@Injectable()
export class WeatherDataService {

  constructor(private _http: Http) { }

  private fetchUrl: string = "http://api.openweathermap.org/data/2.5/forecast";
  private apiKey: string = "de4ed9529200f62b0400f5818f1cdbd7";
  private unit: string = "metric";

  //http://api.openweathermap.org/data/2.5/forecast?q=London,us&units=metric&APPID=de4ed9529200f62b0400f5818f1cdbd7
  getWeatherData(city: string, country: string): Observable<IWeather>{
    let url: string =  `${this.fetchUrl}?q=${city},${country}&units=${this.unit}&APPID=${this.apiKey}`;
    return this._http.get(url).map((response: Response) => this.parseResponse(response));
  }

  parseResponse(response: Response): IWeather{
    let responseJson: any = JSON.parse(response.text());
    let forecastList: IForecast[] = [];
    let skipDate: string = "";
    let id: number = 0;

    for(let item of responseJson.list){
      // for a single day we get forecast of different time with a gap of 3 hrs
      // we consider only the first forcast of the day
      if(skipDate == item.dt_txt.split(" ")[0]){ 
        if(item.main.temp_max > forecastList[forecastList.length-1].temp_max){
          forecastList[forecastList.length-1].temp_max = item.main.temp_max;
        }
        if(item.main.temp_min < forecastList[forecastList.length-1].temp_min){
          forecastList[forecastList.length-1].temp_min = item.main.temp_min;
        }
        continue;
      }
      skipDate = item.dt_txt.split(" ")[0];

      let forecastInst: IForecast = {
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

    let weatherData: IWeather = {
      'city' : responseJson.city.name,
      'country' : responseJson.city.country,
      'forecastList' : forecastList
    }

    return weatherData;    
  }

  getDay(timeInSec: number) : string{
    let currDate: Date = new Date();
    let givenDate: Date = new Date(timeInSec * 1000);

    if(currDate.getUTCDate() == givenDate.getUTCDate()){
      return "Today";
    }else if(givenDate.getUTCDate()-currDate.getUTCDate() == 1){
      return "Tomorrow"
    }else{
      return this.getDayInString(givenDate.getUTCDay());
    }
  }


  getDayInString(dayNum: number): string{
    switch(dayNum){
      case 0: return "Sunday";
      case 1: return "Monday";
      case 2: return "Tuesday";
      case 3: return "Wednesday";
      case 4: return "Thursday";
      case 5: return "Friday";
      case 6: return "Saturday";
      default: return "";
    }
  }
}
