function setup_page() {
    set_navbar()
    add_content()
}

async function set_navbar() {
    const url = "navbarpages.json";
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

async function add_content() {
    const url = "navbarpages.json";
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