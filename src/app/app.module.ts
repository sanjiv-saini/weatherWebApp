import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherDataService } from './weather-data/weather-data.service';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailViewComponent } from './detail-view/detail-view.component';


@NgModule({
  declarations: [
    AppComponent,
    ListItemComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
