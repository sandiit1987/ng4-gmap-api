import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{
  origin: object;
  destination: object;
  constructor(private changeDectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
  }
  ngAfterViewChecked() {

  }
  originLatLangChange(position: object) {
    this.origin = position;
    this.changeDectorRef.detectChanges();
  }
  destinationLatLangChange(position: object) {
    this.destination = position;
    this.changeDectorRef.detectChanges();
  }
}
