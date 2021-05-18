//get elements from popup
const btn = document.getElementById('button')
const container = document.getElementById('container')

let url = null;
let videoId = null;

//download function
function download(dataurl, filename) {
    var a = document.createElement("a");
    a.href = dataurl;
    a.setAttribute("download", filename);
    a.click();
  }


//add button click even listener
btn.onclick = ()=>{
    //set inner text to loading
    btn.innerHTML = "Converting..."

    //console.log(videoId)
    options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }

    //send fetch request to api http://localhost:4000/video/${videoId} proxy : https://whispering-journey-13887.herokuapp.com/
    fetch(`http://localhost:3000/video/${videoId}`, options)
    .then(response => response.json())
    .then((data) =>{

        btn.innerHTML = "Finished!"

        //generate download link
        download(data.path, "download");

    });

}

//gets the url on the current page
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
     url = tabs[0].url;

    //enables the button if the window is currently a youtube video
    if(url.startsWith('https://www.youtube.com/watch?v=')){
        btn.innerHTML = "Convert to MP3"
        btn.removeAttribute("disabled")

        videoId = url.substring(32)

    }else{
        btn.innerHTML = "Not in a youtube video"
        btn.setAttribute("disabled", "true")
    }
   
});

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');



