//The function is async so it does this alongside the other page loading stuff further behind the scenes.
async function setup_page() {

    //Get the url parameter and store what the page is set to
    console.log(window.location.href)
    console.log(window.location.href.split("?p="))


    //This code gets the page content from an md file and copies it into the "main content" div in page.html based on the url parameters.
    //The url will get set earlier when I implement the url checking.
    const url = "/pages/" + window.location.href.split("?p=")[1] + ".md";
    //Tries to fetch the page content, if it can't then it'll throw an error.
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }  

    //This sets result to be the content gotten from the fetch.
    const result = await response.text();
    console.log(result);
    //This is the part that sets the inside of the div to the page content.
    document.getElementById("maincontent").innerHTML = result
    //This catches the thrown error and puts a message in the console, as well as going to an error page.
    } catch (error) {
        console.error(error.message);
        //This sets the divs inner html to a very simple error page if it can't find page content
        document.getElementById("maincontent").innerHTML = "<p>Oopsie, that page couldn't be found!!!</p>"
    }
}