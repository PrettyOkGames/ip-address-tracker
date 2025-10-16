const getAddressBtn = document.getElementById("btn-getAddress")
const searchBox = document.getElementById("searchBox")
const output_ipAddress = document.getElementById("ipAddress")
const output_location = document.getElementById("location")
const output_timezone = document.getElementById("timezone")
const output_isp = document.getElementById("isp")

const apiEndpointStart = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ygXPWl3Mk3fLcoIq0eaD1SuZT5Efx&ipAddress=`
let latestIPAddress = ``

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
    output_ipAddress.innerText = locationAsJson.ip
    output_location.innerText = `${locationAsJson.location.city}, ${locationAsJson.location.region}`
    output_timezone.innerText = `UTC ${locationAsJson.location.timezone}`
    output_isp.innerText = `${locationAsJson.isp}`
}
getAddress(searchBox.value)

const map = L.map(`map`).setView([51.505, -0.09], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
//let userMap = L.map(`map`).setView