import { MarkerService } from './services/marker.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService]
})
export class AppComponent {
  // Start Position
  lat: number = 38.9536;
  lng: number = -94.73367;
  // Zoom level
  zoom: number = 9;
  // Values
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;
  // Markers
  markers: Marker[];

  constructor(private _markerService: MarkerService) {
    this.markers = this._markerService.getMarkers();
  }

  clickedMarker(marker: Marker, index: number) {
    console.log('Clicked Marker: ' + marker.name + ' at index ' + index);
  }

  mapClicked($event: any) {
    const newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    };

    this.markers.push(newMarker);
  }

  markerDragEnd(marker: any, $event: any) {
    console.log('dragEnd', marker, $event);
    const updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    };

    const newLat = $event.coords.lat;
    const newLng = $event.coords.lng;

    this._markerService.updateMarker(updMarker, newLat, newLng);
  }

  addMarker() {
    if (this.markerDraggable === 'yes') {
      var isDraggable = true;
    } else {
      var isDraggable = false;
    }

    const newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    };

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  removeMarker(marker) {
    console.log('Removing marker...');

    for(let i = 0; i < this.markers.length; i++) {
      if (marker.lat === this.markers[i].lat && marker.lng === this.markers[i].lng) {
        this.markers.splice(i, 1);
      }
    }

    this._markerService.removeMarker(marker);
  }
}

// Marker Type
interface Marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
