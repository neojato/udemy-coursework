export class Init {
  load() {
    if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
      console.log('No markers found......creating...');
      const markers = [
        {
          name: 'Company One',
          lat: 38.825588,
          lng: -94.018029,
          draggable: true
        },
        {
          name: 'Company Two',
          lat: 38.868164,
          lng: -93.889071,
          draggable: true
        },
        {
          name: 'Company Three',
          lat: 38.858279,
          lng: -94.930498,
          draggable: true
        }
      ];

      localStorage.setItem('markers', JSON.stringify(markers));
    } else {
      console.log('Loading markers...');
    }
  }
}
