import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  constructor() { }

  @Input ()
  city: string;

  @Input()
  country: string;

  @Input()
  forecast: any;

  ngOnInit() {
  }

}
