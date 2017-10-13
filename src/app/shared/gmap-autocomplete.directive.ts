import {Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare var google: any;
@Directive({
  selector: '[appGmapAutocomplete]'
})
export class GmapAutocompleteDirective implements OnInit {
  map: any;
  autocomplete: any;
  @Input() usedFor: string;
  @Output() originLatLangChange: EventEmitter<object> = new EventEmitter<object>();
  @Output() destinationLatLangChange: EventEmitter<object> = new EventEmitter<object>();
  constructor(private elementRef: ElementRef) {
    this.map = new google.maps.Map(this.elementRef.nativeElement, {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    this.autocomplete = new google.maps.places.Autocomplete(this.elementRef.nativeElement);
  }
  ngOnInit() {
    const currentInstance = this;
    this.autocomplete.addListener('place_changed', function() {
      const place = currentInstance.autocomplete.getPlace();
      if (currentInstance.usedFor === 'origin') {
        currentInstance.originLatLangChange.emit({lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), location: place.name });
      }
      else {
        currentInstance.destinationLatLangChange.emit({lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), location: place.name });
      }
    });
  }
}
