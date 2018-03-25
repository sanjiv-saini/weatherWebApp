import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  const forecastData = {
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  afterAll(() => {
    component.forecast = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show selected when selected', () => {

    component.isSelected = true;
    component.forecast = forecastData;
    fixture.detectChanges();

    const selectedEle = fixture.debugElement.nativeElement.querySelector('.weatherListItem');
    expect(selectedEle).toBeTruthy();
    expect(selectedEle.classList.contains('selected')).toBeTruthy();
  });

  it('should emit selected index on click', () => {
    component.forecast = forecastData;
    component.select.subscribe(index => {
      expect(index).toEqual(forecastData.index);
    });

    fixture.detectChanges();
    const ele = fixture.debugElement.nativeElement.querySelector('.weatherListItem');
    expect(ele).toBeTruthy();
    ele.click();
  });
});
