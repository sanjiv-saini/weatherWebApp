import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherDataService } from './weather-data/weather-data.service';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailViewComponent } from './detail-view/detail-view.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule],
      declarations: [
        AppComponent,
        ListItemComponent,
        DetailViewComponent
      ],
      providers: [WeatherDataService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Sunshine'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Sunshine');
  }));

});
