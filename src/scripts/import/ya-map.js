document.addEventListener('DOMContentLoaded', () => {
if (document.querySelector('#map')) {
	let myMap;
	function init() {
		// Map
		myMap = new ymaps.Map('map', {
			center: [55.801022901774175,37.595980101852234],
			zoom: 15,
			controls: []
		});

		const balloon = {
			iconLayout: 'default#image',
			iconImageHref: 'img/svg/marker-map.svg',
			iconImageSize: [108, 115],
			iconImageOffset: [-56, -110],
			// balloonContentSize: [302, 194],
			// balloonLayout: "default#imageWithContent",
			// balloonImageHref: 'img/svg/balloon.svg',
			// balloonImageOffset: [-15, 28],
			// balloonImageSize: [302, 194]
		};

		myMap.geoObjects.add(
			new ymaps.Placemark(
				[55.801022901774175,37.595980101852234],
				{
					balloonContent: '<div class="balloon"><p><b>БЦ “Станколит”</b></p><p>Складочная ул.,1, стр. 1, подъезд 11</p><p></div>'
				},
				balloon
			)
		);

		myMap.behaviors.disable('scrollZoom');
		
		var zoomControl = new ymaps.control.ZoomControl({
			options: {
				size: "small"
			}
		});
		myMap.controls.add(zoomControl);
	}

	// Отложеная загрузка при видимости элемента карты
	const apiUrl = 'https://api-maps.yandex.ru/2.1/?apikey=06dc8d2e-13b0-4dc0-829a-b9ea0a2df3f9&lang=ru_RU';
	const iObserver = new IntersectionObserver(function(entries) {
		if (entries[0].isIntersecting === true) {
			loadMap();
			iObserver.unobserve(entries[0].target); // перестаём отслеживать видимость
		}
	}, {threshold: [0]}); // от 0 до 1, % видимой части элемента на экране

	iObserver.observe(document.getElementById('map'));

	function loadMap () {
		let map = document.getElementById('map');
		if (!map.classList.contains('js--loaded')) {
			map.classList.add('js--loaded');
		
			if (typeof ymaps === 'undefined') {
				let js = document.createElement('script');
				js.src = apiUrl;
				document.getElementsByTagName('head')[0].appendChild(js);
				js.onload = function() {
					ymaps.ready(init);
				};
				js.onerror = function() {
					console.log('error load ymaps');
				};
			} else {
				ymaps.ready(init);
			}
		}
	}
}
});