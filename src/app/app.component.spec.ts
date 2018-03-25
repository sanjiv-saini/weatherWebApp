import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherDataService } from './weather-data/weather-data.service';
import { FormsModule } from '@angular/forms';
import { ListItemComponent } from './list-item/list-item.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let rootEle: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [
        AppComponent,
        ListItemComponent,
        DetailViewComponent
      ],
      providers: [WeatherDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    rootEle = fixture.debugElement.nativeElement;
    fixture.autoDetectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it(`should have as title 'Sunshine'`, async(() => {
    expect(component.title).toEqual('Sunshine');
  }));

  it('should show error when error occurred', async(() => {
    let errorEle: any;
    let weatherCardEle: any;

    component.isErrorOccurred = true;
    fixture.detectChanges();
    errorEle = fixture.debugElement.nativeElement.querySelector('#error');
    weatherCardEle = fixture.debugElement.nativeElement.querySelector('.weatherCard');
    expect(errorEle).toBeTruthy();
    expect(weatherCardEle).toBeFalsy();

    component.isErrorOccurred = false;
    fixture.detectChanges();
    errorEle = fixture.debugElement.nativeElement.querySelector('#error');
    weatherCardEle = fixture.debugElement.nativeElement.querySelector('.weatherCard');
    console.log(errorEle);
    expect(errorEle).toBeFalsy();
    expect(weatherCardEle).toBeTruthy();

  }));

  it('should tell wheather correct weather item is selcted', async(() => {
    const selectedIndex = 2;
    component.selectedItemIndex = selectedIndex;
    expect(component.isSelected(selectedIndex)).toBeTruthy();
  }));

  it('should select right weather item', async(() => {
    const selectedIndex = 4;
    component.itemSelected(selectedIndex);
    expect(component.isSelected(selectedIndex)).toBeTruthy();
  }));

  it('should reset data', async(() => {
    component.isErrorOccurred = true;
    component.selectedItemIndex = 2;
    component.resetData();

    expect(component.isErrorOccurred).toBeFalsy();
    expect(component.selectedItemIndex).toEqual(0);
  }));

});
