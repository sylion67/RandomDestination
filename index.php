<!DOCTYPE html>
<html>
<head>
	<title>Random destination</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="main.css">
	<script src="https://maps.google.com/maps/api/js?key=AIzaSyBxDAXNxWZ8D0Es3Bk9_f2DYzhItk2oDrA&libraries=places" type="text/javascript"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
</head>
<body>
	<header>
		<h1>Random destination</h1>
	</header>
	<main>
		<div id="informationDiv"></div>
		<div id="mapContainer">
		</div>
		<div id="formDistance">
			<p><input type="number" id="distance" name="distance"> <span>KM<span></p>
			<button id="submit">Search</button>
		</div>
	</main>
	<script src="main.js"></script>
</body>
</html>