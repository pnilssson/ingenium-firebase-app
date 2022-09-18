import { Component, OnInit } from '@angular/core';
import { faBook, faChartSimple, faToolbox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faBook = faBook;
  faToolbox = faToolbox;
  faChartSimple = faChartSimple;

  constructor() { }

  ngOnInit(): void {
  }

}
