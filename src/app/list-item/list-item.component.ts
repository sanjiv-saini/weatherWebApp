import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IForecast } from '../weather-data/weather';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor() { }

  @Input()
  forecast: IForecast;

  @Input()
  isSelected: boolean;

  @Output()
  select: EventEmitter<number> = new EventEmitter<number>();

  selectItem(index: number) {
    this.select.emit(index);
  }

  ngOnInit() {
  }

}
