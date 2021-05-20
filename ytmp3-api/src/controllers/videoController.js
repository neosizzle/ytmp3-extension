const path = require('path')
const fs = require('fs')
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

//declare public dir path
const publicDirPath =  path.join(__dirname , '../../public')
const ffmpegPath = path.join(__dirname , '../../ffmpeg/bin/ffmpeg.exe')

const showVideo = (req, res)=>{

    //get videoid from req 
    videoId = req.params.url

    //Configure YoutubeMp3Downloader
    var YD = new YoutubeMp3Downloader({
        "ffmpegPath": ffmpegPath,        // FFmpeg binary location
        "outputPath": publicDirPath,    // Output file location (default: the home directory)
        "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
        "queueParallelism": 2,                  // Download parallelism (default: 1)
        "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
        "allowWebm": false                      // Enable download from WebM sources (default: false)
    });

    //Download video and save as MP3 file
    YD.download(videoId , `${videoId}.mp3`);

    YD.on("finished", function(err, data) {
        console.log("Done!")

        const filePath = path.join(publicDirPath , `${data.videoId}.mp3`)

        //res.sendFile(`${data.videoId}.mp3` , {root : publicDirPath})
        res.download(filePath , `${data.videoTitle}.mp3`)
  
    });

    YD.on("error", function(error) {
        console.log("[ERROR]" + error);

        res.status(500).send({error})
    });

    YD.on("progress", function(progress) {
        console.log(`${progress.videoId} : ${progress.progress.percentage}`)

    });

}


const deleteVideo = (req, res)=>{
    const videoId = req.params.url

    //delete file from fs with id

    fs.unlink(`${publicDirPath}/${videoId}.mp3`, (error) => {
        if (error) {
            console.log("[ERROR] " + error)
            res.send({error})
        }
      
        else{
            res.send({status:"OK"})
        }
        //file removed
      })

    

}
module.exports = {
    showVideo,
    deleteVideo
}