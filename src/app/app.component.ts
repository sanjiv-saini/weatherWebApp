import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from './weather-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private _title = 'Sunshine';
  private _country = 'US';
  private _city = 'London';
  private _selectedItemIndex = 0;
  private _selected;
  private _forecasts;

  constructor(private _weatherDataService: WeatherDataService){}
  
  ngOnInit(){
    this._weatherDataService.getWeatherData()
                            .subscribe(
                              (result: any) => {this._city = result.city; this._country = result.country; this._forecasts = result.forecastList; this._selected = result.forecastList[0]},
                              (error: string) => console.log(error));
  }

  private itemSelected(index: number){
    this._selectedItemIndex = index;
    this._selected = this._forecasts[this._selectedItemIndex];
  }
}
