'use strict';

var mapObject = function(){
	var self = this;
	self.apiKey = 'AIzaSyBxDAXNxWZ8D0Es3Bk9_f2DYzhItk2oDrA';
	self.distance = 0;
	self.lng;
	self.lat;
	self.myPos;
	self.myPosImage;
	self.map;
	self.markerMyPos;
	self.markerDestination;
	self.dataRandom;

	self.earthRadii = {
        mi: 3963.1676,
        km: 6378.1,
        ft: 20925524.9,
        mt: 6378100,
        in: 251106299,
        yd: 6975174.98,
        fa: 3487587.49,
        na: 3443.89849,
        ch: 317053.408,
        rd: 1268213.63,
        fr: 31705.3408
    }

	self.myPosImage = new google.maps.MarkerImage(
	    'http://alomea.fr/wp-content/uploads/2016/12/localisation-icon.png',
	    new google.maps.Size(45, 45),
	  	new google.maps.Point(0, 0),
	  	new google.maps.Point(17, 34),
	  	new google.maps.Size(45, 45)
  	);

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
			zoom: 10, 
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

		$('#submit').click(function(){
			self.initDestination();
		})
	}

	self.initDestination = function(){
		self.distance = $('#distance').val();
		var request = {
		    location: self.myPos,
		    radius: (self.distance/self.earthRadii.km) * self.earthRadii.mt,
		    type: ['night_club']

		};

		self.service = new google.maps.places.PlacesService(self.map);
		self.service.nearbySearch(request, function(retour){
			self.setRandomPoint(retour);  	
		});
	}

	self.setRandomPoint = function(data){
		console.log(data);
		var dataLength = data.length;
		var random = Math.ceil(Math.random()*dataLength-1);
		console.log(random);
		self.dataRandom = data[random];
		self.setMarker();
	}

	self.setMarker = function(){
		console.log(self.dataRandom);
		var posi = self.dataRandom.geometry.location;
		var distanceBetween = '';
		$('#informationDiv').html('<p>Nom : '+self.dataRandom.name+'</p><p>'+distanceBetween+'</p><p>'+self.dataRandom.vicinity+'</p><p>Note : '+self.dataRandom.rating+'/5</p>');


		if(typeof(self.markerDestination) !== 'undefined'){
			self.markerDestination.setMap(null);
		}
		self.markerDestination = new google.maps.Marker({
			position: posi,
			map: self.map
		})
	}
}


$(document).ready(function(){
	var mapTest = new mapObject();
	mapTest.start();
});