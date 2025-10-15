document.addEventListener("", async () => {
    try {
        const res = await fetch(
            `https://geo.ipify.org/api/v2/country,city?apiKey=`
        )
        if (!res.ok) {
            throw new Error("Error fetching data")
        }
        const data = await res.json()
        console.log(data)
    }
    catch (error) {
        console.error(error)
    }
})