async function set_navbar() {
    //document.getElementById("navbar").innerHTML = '<a href="index.html"><h3>Home page</h3></a><a href="map.html"><h3>Comic Map</h3></a><a href="resources.html"><h3>Art resources</h3></a>';
    //console.log("EXPLOSIONNN!!!!!")
    const url = "navbar.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }  

    const result = await response.json();
    console.log(result);
    document.getElementById("navbar").innerHTML = result.content
    } catch (error) {
        console.error(error.message);
    }
}