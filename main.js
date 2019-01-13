'use strict';

console.log('test');

var mapObject = function(){
	var self = this;
	/*navigator.geolocation.getCurrentPosition(function(position){
		console.log(position.coords.longitude);
		self.lat = position.coords.latitude;
		self.lng = position.coords.longitude;
	});*/

	self.myPosImage = {
	    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
	    // This marker is 20 pixels wide by 32 pixels high.
	    size: new google.maps.Size(50, 52)
	  };
	self.start = function(){
		self.getPosition();
	}
	self.getPosition = function(){
		navigator.geolocation.getCurrentPosition(function(position){
			self.lat = position.coords.latitude;
			self.lng = position.coords.longitude;
			self.myPos = {lat: self.lat, lng: self.lng};
			self.initMap();
		});		
	}


	self.initMap = function(){
		self.map = new google.maps.Map(document.getElementById('mapContainer'), {
			// Nous plaçons le centre de la carte avec les coordonnées ci-dessus
			center: new google.maps.LatLng(self.lat, self.lng), 
			// Nous définissons le zoom par défaut
			zoom: 15, 
			// Nous définissons le type de carte (ici carte routière)
			// Nous activons les options de contrôle de la carte (plan, satellite...)
			mapTypeControl: true,
			mapTypeControlOptions: {
	      		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			    mapTypeIds: ['hybrid', 'roadmap', 'terrain']
			},

			// Nous désactivons la roulette de souris
			scrollwheel: false, 
			// Activation des options de navigation dans la carte (zoom...)
			navigationControl: true, 
			navigationControlOptions: {
				// Comment ces options doivent-elles s'afficher
				style: google.maps.NavigationControlStyle.DROPDOWN_MENU 
			}
		});
		self.markerMyPos = new google.maps.Marker({
			position: self.myPos,
			icon: self.myPosImage,
			map: self.map
		})
	}


}

$(document).ready(function(){
	var mapTest = new mapObject();
	mapTest.start();
})