async function setup_page() {
    const searchtext = window.location.href.split("?s=")[1]
    if (searchtext){
        document.getElementById("pagesearch").value = decodeURIComponent(searchtext).replaceAll("+", " ")
    }
    
}