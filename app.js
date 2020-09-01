mapboxgl.accessToken = config.accessToken;
const columnHeaders = config.sideBarInfo;

let geojsonData = {};
const filteredGeojson = {
    "type": "FeatureCollection",
    "features": []
};

const map = new mapboxgl.Map({
    container: "map",
    style: config.style,
    center: config.center,
    zoom: config.zoom,
});

function flyToLocation(currentFeature, zoom) {
    map.flyTo({
        center: currentFeature,
        zoom: zoom
    });
}

function createPopup(currentFeature) {
    const popups = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popups[0]) popups[0].remove();
    const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML("<h3>" + currentFeature.properties[config.popupInfo] + "</h3>")
        .addTo(map);
}

function buildLocationList(locationData) {
    /* Add a new listing section to the sidebar. */
    const listings = document.getElementById("listings");
    listings.innerHTML = "";
    locationData.features.forEach(function (location, i) {
        const prop = location.properties;

        const listing = listings.appendChild(document.createElement("div"));
        /* Assign a unique `id` to the listing. */
        listing.id = "listing-" + prop.id;

        /* Assign the `item` class to each listing for styling. */
        listing.className = "item";

        /* Add the link to the individual listing created above. */
        const link = listing.appendChild(document.createElement("a"));
        link.className = "title";

        link.id = "link-" + prop.id;
        link.innerHTML = '<button class="flex-parent flex-parent--center-main">' + '<p style="line-height: 1.25">' + prop[columnHeaders[0]] + "</p>" + "</button>";

        /* Add details to the individual listing. */
        const details = listing.appendChild(document.createElement("div"));
        details.className = "content";

        for (let i = 1; i < columnHeaders.length; i++) {
            const div = document.createElement("div");
            div.innerText += prop[columnHeaders[i]];
            div.className;
            details.appendChild(div);
        }

        link.addEventListener("click", function () {
            const clickedListing = location.geometry.coordinates;
            flyToLocation(clickedListing, 11);
            createPopup(location);

            const activeItem = document.getElementsByClassName("active");
            if (activeItem[0]) {
                activeItem[0].classList.remove("active");
            }
            this.parentNode.classList.add("active");

            const divList = document.querySelectorAll(".content");
            const divCount = divList.length;
            for (i = 0; i < divCount; i++) {
                divList[i].style.maxHeight = null;
            };

            for (let i = 0; i < geojsonData.features.length; i++) {
                this.parentNode.classList.remove("active");
                this.classList.toggle("active");
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            };
        });
    });

};

    // csv2geojson - following the Sheet Mapper tutorial https://www.mapbox.com/impact-tools/sheet-mapper
    console.log("loaded");
    $(document).ready(function () {
        console.log("ready");
        $.ajax({
            type: "GET",
            url: config.CSV,
            dataType: "text",
            success: function (csvData) {
                makeGeoJSON(csvData);
            },
            error: function (request, status, error) {
                console.log(request);
                console.log(status);
                console.log(error);
            }
        });
    });

    function makeGeoJSON(csvData) {
        csv2geojson.csv2geojson(csvData, {
            latfield: "Latitude",
            lonfield: "Longitude",
            delimiter: ","
        }, function (err, data) {
            data.features.forEach(function (data, i) {
                data.properties.id = i;
            });

            geojsonData = data;
            // Add the the layer to the map
            map.addLayer({
                "id": "locationData",
                "type": "circle",
                "source": {
                    "type": "geojson",
                    "data": geojsonData
                },
                "paint": {
                    "circle-radius": 5, // size of circles
                    "circle-color": "#3D2E5D", // color of circles
                    "circle-stroke-color": "white",
                    "circle-stroke-width": 1,
                    "circle-opacity": 0.7
                }

            });
        });

        map.on("click", "locationData", function (e) {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ["locationData"]
            });
            const clickedPoint = features[0].geometry.coordinates;
            flyToLocation(clickedPoint, 11);
            sortByDistance(clickedPoint);
            createPopup(features[0]);
        });

        map.on("mouseenter", "locationData", function () {
            map.getCanvas().style.cursor = "pointer";
        });

        map.on("mouseleave", "locationData", function () {
            map.getCanvas().style.cursor = "";
        });
        buildLocationList(geojsonData);
    };
});
