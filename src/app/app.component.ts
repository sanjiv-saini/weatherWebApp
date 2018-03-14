import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sunshine';
  private country = 'US';
  private city = 'London';
  private selected = {
                        main:"Clear",
                        description: "clear sky",
                        temp: 2.79,
                        temp_min: 2.1,
                        temp_max: 2.79,
                        day: "Today",
                        pressure: 323,
                        humidity: 32,
                        wind: 101
                      }
  private forecasts = [
                        {
                          main:"Clear",
                          description: "clear sky",
                          temp: 2.79,
                          temp_min: 2.1,
                          temp_max: 2.79,
                          day: "Today"
                        },
                        {
                          main:"Clear",
                          description: "clear sky",
                          temp: 2.79,
                          temp_min: 2.1,
                          temp_max: 2.79,
                          day: "Tomorrow"
                        },
                        {
                          main:"Clear",
                          description: "clear sky",
                          temp: 2.79,
                          temp_min: 2.1,
                          temp_max: 2.79,
                          day:"Sunday"
                        },
                        {
                          main:"Clear",
                          description: "clear sky",
                          temp: 2.79,
                          temp_min: 2.1,
                          temp_max: 2.79,
                          day: "Monday"
                        }
                      ]

}
