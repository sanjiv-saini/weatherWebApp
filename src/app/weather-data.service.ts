import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class WeatherDataService {

  constructor(private _http: Http) { }

  private fetchUrl = "http://api.openweathermap.org/data/2.5/forecast";
  private apiKey = "de4ed9529200f62b0400f5818f1cdbd7";
  private unit = "metric";
  private city = "London";
  private country = "us";

  //http://api.openweathermap.org/data/2.5/forecast?q=London,us&units=metric&APPID=de4ed9529200f62b0400f5818f1cdbd7
  getWeatherData(): Observable<any>{
    let url =  `${this.fetchUrl}?q=${this.city},${this.country}&units=${this.unit}&APPID=${this.apiKey}`;
    return this._http.get(url).map((response: Response) => this.parseResponse(response));
  }

  private parseResponse(response: Response){
    let parsedData = {};
    let responseJson = JSON.parse(response.text());
    parsedData["city"] = responseJson.city.name;
    parsedData["country"] = responseJson.city.country;
    parsedData["forecastList"] = [];
    let skipDate = "";
    let id = 0;
    for(let item of responseJson.list){
      if(skipDate == item.dt_txt.split(" ")[0]){
        continue;
      }
      let parsedItem = {};
      parsedItem["index"] = id++;
      parsedItem["temp"] = item.main.temp;
      parsedItem["temp_min"] = item.main.temp_min;
      parsedItem["temp_max"] = item.main.temp_max;
      parsedItem["pressure"] = item.main.pressure;
      parsedItem["humidity"] = item.main.humidity;
      parsedItem["main"] = item.weather[0].main;
      parsedItem["description"] = item.weather[0].description;
      parsedItem["wind"] = item.wind.speed;
      parsedItem["day"] = this.getDay(item.dt);      

      parsedData["forecastList"].push(parsedItem);

      skipDate = item.dt_txt.split(" ")[0];
    }

    return parsedData;    
  }

  private getDay(timeInSec) : string{
    let currDate = new Date();
    let givenDate = new Date(timeInSec * 1000);

    if(currDate.getUTCDate() == givenDate.getUTCDate()){
      return "Today";
    }else if(givenDate.getUTCDate()-currDate.getUTCDate() == 1){
      return "Tomorrow"
    }else{
      return this.getDayInString(givenDate.getUTCDay());
    }
  }


  private getDayInString(dayNum: number){
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
