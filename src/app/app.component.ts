import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from './weather-data/weather-data.service';
import { IForecast } from './weather-data/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Sunshine';
  country = 'US';
  city = 'London';
  selectedItemIndex = 0;
  selected: IForecast;
  forecasts: IForecast[];
  isErrorOccurred = false;
  errorMsg = 'some error occurred';
  resultCity: string;
  resultCountry: string;

  constructor(private _weatherDataService: WeatherDataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isErrorOccurred = false;
    this.selectedItemIndex = 0;
    this._weatherDataService.getWeatherData(this.city, this.country)
                            .subscribe(
                              (result: any) => {
                                                this.resultCity = result.city;
                                                this.resultCountry = result.country;
                                                this.forecasts = result.forecastList;
                                                this.selected = result.forecastList[0];
                                              },
                              (error: string) => this.isErrorOccurred = true);
  }

  private itemSelected(index: number) {
    this.selectedItemIndex = index;
    this.selected = this.forecasts[this.selectedItemIndex];
  }

  private isSelected(currIndex: number) {
    return this.selectedItemIndex === currIndex;
  }
}
