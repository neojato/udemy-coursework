import { Init } from './../init-markers';
import { Injectable } from '@angular/core';

@Injectable()
export class MarkerService extends Init {

  constructor() {
    super();
    console.log('MarkerService Initialized...');
    this.load();
  }

  getMarkers() {
    const markers = JSON.parse(localStorage.getItem('markers'));
    return markers;
  }

  addMarker(newMarker) {
    // Fetch existing markers
    const markers = JSON.parse(localStorage.getItem('markers'));
    // Push to array
    markers.push(newMarker);
    // Set localStorage
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  updateMarker(marker, newLat, newLng) {
    // Fetch existing markers
    const markers = JSON.parse(localStorage.getItem('markers'));
    for (let i = 0; i < markers.length; i++) {
      if (marker.lat === markers[i].lat && marker.lng === markers[i].lng) {
        markers[i].lat = newLat;
        markers[i].lng = newLng;
      }
    }
    // Set localStorage
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  removeMarker(marker) {
    // Fetch existing markers
    const markers = JSON.parse(localStorage.getItem('markers'));
    for (let i = 0; i < markers.length; i++) {
      if (marker.lat === markers[i].lat && marker.lng === markers[i].lng) {
        markers.splice(i, 1);
      }
    }
    // Set localStorage
    localStorage.setItem('markers', JSON.stringify(markers));
  }

}
