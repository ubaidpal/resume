/*
made by Nauman Munawar
*/

var handleVectorMap = function() {
	if (('#splunk-map').length !== 0) {
		$('#splunk-map').css('height', wHeight);
		$('#splunk-map').vectorMap({
			map: 'world_mill_en',
			scaleColors: ['#e74c3c', '#0071a4'],
			normalizeFunction: 'polynomial',
			hoverOpacity: 0.5,
			hoverColor: false,
			markerStyle: {
				initial: {
					fill: '#4cabc7',
					stroke: 'transparent',
					r: 3
				}
			},
			regionStyle: {
				initial: {
					fill: 'rgb(97,109,125)',
					"fill-opacity": 1,
					stroke: 'none',
					"stroke-width": 0.4,
					"stroke-opacity": 1
				},
				hover: {
					"fill-opacity": 0.8
				},
				selected: {
					fill: 'yellow'
				},
				selectedHover: {
				}
			},
			focusOn: {
				x: 0.5,
				y: 0.5,
				scale: 2
			},
			backgroundColor: '#242a30',
			markers: f5CountryAttackMap
		});
	}
};

var MapVector = function () {
	"use strict";
	return {
        //main function
        init: function () {
        	handleVectorMap();
        }
    };
}();