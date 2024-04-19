const address = document.querySelector('.map__address');
const tel = document.querySelectorAll('.mode__tel');

const markerProps = [
    {
        coordinates: [37.62, 55.75],
        iconSrc: 'img/pin-active.svg',
        title: "Dealer Company Name",
        address: "Москва, ул. Автодилерская, 23, стр. 1",
        tel: ["+7 (495) 428 12 94", "+7 (495) 428 12 95"],
    },
    {
        coordinates: [37.60, 55.75],
        iconSrc: 'img/pin.svg',
        title: "Dealer Company Name",
        address: "Москва, ул. Каштановая, 19",
        tel: ["+7 (495) 428 13 74", "+7 (495) 428 13 75"]
    }
]

ymaps3 = window.ymaps3;

initMap();

async function initMap() {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls, YMapMarker} = ymaps3;
    const {YMapZoomControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [37.61, 55.75],
                zoom: 13,
            },
            behaviors: ['drag', 'pinchZoom', 'mouseTilt']
        }
    );


    const defaultSchemeLayer = new YMapDefaultSchemeLayer();
    const defaultFeaturesLayer = new YMapDefaultFeaturesLayer();

    map.addChild(defaultSchemeLayer);
    map.addChild(defaultFeaturesLayer);
    map.addChild(
        new YMapControls({position: 'right'})
            .addChild(new YMapZoomControl({}))
    );

    markerProps.forEach(item => {
        const markerElement = document.createElement('img');
        markerElement.className = 'icon-marker';
        markerElement.src = item.iconSrc;

        markerElement.onclick = () => {
            address.textContent = item.address
            tel[0].textContent = item.tel[0]
            tel[1].textContent = item.tel[1]
        }
        map.addChild(new YMapMarker({coordinates: item.coordinates}, markerElement));
    })
}


