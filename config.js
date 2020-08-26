
const config = {
    style: "mapbox://styles/juliasobczak/ckdkd0g5r112i1imqc8zo7165",
    accessToken: "pk.eyJ1IjoianVsaWFzb2JjemFrIiwiYSI6ImNrY2RtOXpkZDAwenUycG54eXlsYTFmcXkifQ.3hLkp5zWDu7IvZG_zsaKJQ",
    CSV: "https://docs.google.com/spreadsheets/d/1wJtHsBoDY2DMr-rX0jqQzZlSOvj1a55xH8aCksW04Ig/gviz/tq?tqx=out:csv&sheet=Sheet1",
    center: [-99.140625,
        39.90973623453719], //Lng, Lat
    zoom: 3, //Default zoom
    title: "Replace with your title",
    description: "Replace with information about your application. Ex. You can search by address to sort the list below by distance. You can also filter the list by language support options, which days a location is open, and whether they have devices to use to complete the survey by phone or online.",
    sideBarInfo: ["Name", "Facebook Group"],
    popupInfo: ["Name"],
    filters: [
        {
            type: "dropdown",
            title: "Title of filter: ",
            columnHeader: "Column Name",
            listItems: [
                'filter one',
                'filter two',
                'filter three',
                'filter four',
                'filter five',
                'filter six',
                'filter seven'
            ]
        },
        {
            type: "checkbox",
            title: "Title of filter: ",
            columnHeader: "Column Name",
            listItems: ["filter one", "filter two", "filter three"]
        },
        {
            type: "dropdown",
            title: "Title of filter: ",
            columnHeader: "Column Name",
            listItems: [
                'filter one',
                'filter two',
                'filter three',
                'filter four',
                'filter five',
                'filter six',
                'filter seven'
            ]
        }
    ]

};
