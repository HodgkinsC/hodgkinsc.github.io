//These are both arrays that hold the pages and their commands that have been found by the search
//(Commands are kinda just the names of the pages and also describe what happens in them.)
let found_pages = []
let page_cmds = []

//Async since it needs to wait for a fetch before continuing.
async function setup_page() {
    //This finds the divider in search.html called results, which holds all the search results.
    const output = document.getElementById("results")
    const rawsearch = window.location.href.split("?s=")[1]
    //This gets the search and converts it into usable text, as well as making it lowercase
    //so the searches aren't case sensitive
    const searchtext = decodeURIComponent(rawsearch).replaceAll("+", " ").toLowerCase()
    //If there's actual text then it sets the text box to be the search again. (It usually gets reset after a page reload)
    if (rawsearch){
        document.getElementById("pagesearch").value = searchtext
    }
    console.log("Searching for: ", searchtext)
    //This is the path to a json file which holds basic search data about all the comic pages.
    //(The page command and the text on the page, there usually isn't too much text on each page.)
    const comicpages = "pages/000.json"

    //This fetches the json file
    try {
        const response = await fetch(comicpages);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
    }
    //This gets the json from the file
    const result = await response.json()
    console.log(result)
    //This resets the arrays just in-case
    found_pages = []
    page_cmds = []
    //This goes through every bit of page data and checks if the search text exists somewhere within the page
    Object.values(result).forEach (value => {
        console.log(value)
        if (value.meta.toLowerCase().includes(searchtext) || value.cmd.toLowerCase().includes(searchtext)) {
            console.log("This page includes'", searchtext, "':", value.page)
            //This adds the page to the arrays if it's searched for.
            found_pages.push(value.page)
            page_cmds.push(value.cmd)
        }
    })


    //Error handling
    } catch (error) {
        console.error(error.message)
    }

    //Creates a link to each page in found_pages and makes the link text the page command.
    let i = 0
    Object.values(found_pages).forEach (value => {
        console.log("Applying:", value)
        output.innerHTML += ("  <a href=\"page?p=" + value + "\"><h2>" + page_cmds[i] + "</h2></a>")
        i += 1
    })
}