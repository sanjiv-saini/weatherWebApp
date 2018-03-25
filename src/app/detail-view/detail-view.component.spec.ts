import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewComponent } from './detail-view.component';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { ListItemComponent } from '../list-item/list-item.component';
import { IForecast } from '../weather-data/weather';

describe('DetailViewComponent', () => {
  let component: DetailViewComponent;
  let fixture: ComponentFixture<DetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailViewComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show right city and country propery', () => {
    const city = 'Pune';
    const country = 'IN';
    const outputLoc = city + ', ' + country;
    let locEle: any;

    component.city = city;
    component.country = country;
    component.forecast = {};
    fixture.detectChanges();

    locEle = fixture.debugElement.nativeElement.querySelector('.location');
    console.log(locEle);

    expect(locEle).toBeTruthy();
    expect(locEle.innerHTML).toEqual(outputLoc);
  });

  it('should show selected weather data', () => {
    const forecastData: IForecast = {
      'index': 5,
      'temp': 13.69,
      'temp_min': 8.82,
      'temp_max': 13.69,
      'pressure': 987.54,
      'humidity': 100,
      'weatherType': 'Rain',
      'description': 'light rain',
      'wind': 1.31,
      'day': 'Friday'
    };

    component.forecast = forecastData;
    fixture.detectChanges();

    const descEle = fixture.debugElement.nativeElement.querySelector('.forecastDesc');
    expect(descEle).toBeTruthy();
    expect(descEle.innerHTML).toEqual(forecastData.description);

    const pressureEle = fixture.debugElement.nativeElement.querySelector('.pressureForecast');
    expect(pressureEle).toBeTruthy();
    expect(pressureEle.innerHTML).toEqual(forecastData.pressure + ' hPa');

    const humidityEle = fixture.debugElement.nativeElement.querySelector('.humidityForecast');
    expect(humidityEle).toBeTruthy();
    expect(humidityEle.innerHTML).toEqual(forecastData.humidity + ' %');

    const windEle = fixture.debugElement.nativeElement.querySelector('.windForecast');
    expect(windEle).toBeTruthy();
    expect(windEle.innerHTML).toEqual(forecastData.wind + ' m/s');

  });
});
