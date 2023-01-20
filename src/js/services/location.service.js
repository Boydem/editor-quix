export const locationService = {
    getLatLng,
}

function getLatLng(geoSearchKey) {
    const GEOLOC_API_KEY = 'AIzaSyB5mXoA76shI6CK3DmGjZi3M4PMn7YX4WA'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${geoSearchKey}&key=${GEOLOC_API_KEY}`
    return fetch(url)
        .then(res => res.json())
        .then(geoCodeObj => {
            return geoCodeObj.results[0].geometry.location
        })
}
