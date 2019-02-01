var map = L.map('map');
map.setView([43.6326, 3.87], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);