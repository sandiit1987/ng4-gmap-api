import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {isUndefined} from "util";
declare var google: any;
@Directive({
  selector: '[appGmapDirections]'
})
export class GmapDirectionsDirective implements OnInit, OnChanges {
  @Input() origin: object;
  @Input() destination: object;
  from: any;
  to: any;
  directionsService: any;
  directionsRequest: any;
  map: any;
  mapOptions: object;
  icons: object;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', '400px');
    this.directionsService = new google.maps.DirectionsService();
    this.mapOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.icons = {
      start: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/micons/red.png'),
      end: new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/micons/blue.png')
    };
  }
  ngOnChanges() {
    const currentInstance = this;
    if (!isUndefined(this.origin)) {
      this.from = new google.maps.LatLng(this.origin['lat'], this.origin['lng']);
    }
    if (!isUndefined(this.destination)) {
      this.to = new google.maps.LatLng(this.destination['lat'], this.destination['lng']);
    }
    if (!isUndefined(this.from) && !isUndefined(this.to)) {
      this.map = new google.maps.Map(this.elementRef.nativeElement, this.mapOptions);
      this.directionsRequest = {
        origin: this.from,
        destination: this.to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      };
      this.directionsService.route(
        this.directionsRequest,

        function (response, status) {

          if (status === google.maps.DirectionsStatus.OK) {
            new google.maps.DirectionsRenderer({
              map: currentInstance.map,
              directions: response,
              suppressMarkers: true
            });
            const leg = response.routes[0].legs[0];
            currentInstance.makeMarker(leg.start_location, currentInstance.icons['start'], currentInstance.origin['location'], currentInstance.map);
            currentInstance.makeMarker(leg.end_location, currentInstance.icons['end'], currentInstance.destination['location'], currentInstance.map);

          } else {
            alert('Directions request failed due to ' + status);
          }

        });
    }
  }
  makeMarker (position, icon, title, map) {
    new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      title: title
    });
  }
}
