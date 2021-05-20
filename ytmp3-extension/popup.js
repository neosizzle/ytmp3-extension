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

    downloadOptions = {
        url:`http://localhost:3000/video/${videoId}`//api url
    }

    //chrome api used to download from a url
    chrome.downloads.download(downloadOptions , ()=>{
        console.log("Downloaded")

        //after finish downloading, change the button back to its original form
        btn.innerHTML = "Convert to MP3"

        //send delete request to delete video from storage
        options = {
            method: 'DELETE',
        }
        fetch(`http://localhost:3000/video/${videoId}` , options)//api url
        .then(response=> response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
    })


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



