'use strict';

var mapObject = function(){
	var self = this;

	self.myPosImage = {
	    url: 'http://alomea.fr/wp-content/uploads/2016/12/localisation-icon.png',
	    size: new google.maps.Size(71, 71),
	  	origin: new google.maps.Point(0, 0),
	  	anchor: new google.maps.Point(17, 34),
	  	scaledSize: new google.maps.Size(45, 45)
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

var setDestination = function(){
	var self = this;
	self.distance = $('#distance').val();

	self.initDestination = function(){
		console.log(self.distance);
	}
}

$(document).ready(function(){
	var mapTest = new mapObject();
	mapTest.start();
});

$('#submit').click(function(){
	var destination = new setDestination();
	destination.initDestination();
});