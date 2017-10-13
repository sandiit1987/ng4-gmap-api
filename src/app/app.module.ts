import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GmapAutocompleteDirective } from './shared/gmap-autocomplete.directive';
import { GmapDirectionsDirective } from './shared/gmap-directions.directive';

@NgModule({
  declarations: [
    AppComponent,
    GmapAutocompleteDirective,
    GmapDirectionsDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
