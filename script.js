const getAddressBtn = document.getElementById("btn-getAddress")
const searchBox = document.getElementById("searchBox")
const output_ipAddress = document.getElementById("ipAddress")
const output_location = document.getElementById("location")
const output_timezone = document.getElementById("timezone")
const output_isp = document.getElementById("isp")

const apiEndpointStart = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ygXPWl3Mk3fLcoIq0eaD1SuZT5Efx&ipAddress=`
let latestLongitude = 0
let latestLatitude = 0

getAddressBtn.addEventListener("click", () => {
    event.preventDefault()
    getAddress(searchBox.value)
})
async function getAddress(userIP) {
    const iplocation = await fetch(apiEndpointStart + userIP)
    if (!iplocation.ok) {
        alert("Tha's not a valid IP Address or Domain")
        return
    }
    const locationAsJson = await iplocation.json()

    latestLatitude = locationAsJson.location.lat
    latestLongitude = locationAsJson.location.lng
    output_ipAddress.innerText = locationAsJson.ip
    output_location.innerText = `${locationAsJson.location.city}, ${locationAsJson.location.region}`
    output_timezone.innerText = `UTC ${locationAsJson.location.timezone}`
    output_isp.innerText = `${locationAsJson.isp}`
    console.log(locationAsJson)
    map.setView([latestLatitude, latestLongitude], 13)
    L.marker([latestLatitude, latestLongitude]).addTo(map)
    .bindPopup(`${locationAsJson.location.city}, ${locationAsJson.location.region}`)
    .openPopup();
}
const map = L.map(`map`).setView([latestLatitude, latestLongitude], 13)
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)
getAddress(searchBox.value)