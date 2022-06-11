let player; //Youtub Player
let currentPlay = 0;

// Youtube API Ready
// 當Youtube API準備好時設定撥放器
function onYouTubeIframeAPIReady(){
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId:playList[currentPlay],
        playerVars:{
            // 是否自動撥放
            autoplay:0,
            // 是否顯示控制項
            controls:0,
            // 開始秒數
            start:playTime[currentPlay][0],
            //結束秒數
            end:playTime[currentPlay][1],
            // video annotations not be shown by default
            iv_load_policy:3
        },
        events:{
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    })
}

// Youtube Player Ready
function onPlayerReady(event){
    $("#playButton").on("click", function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    })
}

//Player State Change
function onPlayerStateChange(event){
    // console.log(event);
    if(Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]){
        if(currentPlay < playList.length - 1){
            currentPlay++;
            player.loadVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }else{
            // Stop & Load the first song
            currentPlay = 0;
            player.cueVideoById({
                videoId:playList[currentPlay],
                startSeconds:playTime[currentPlay][0],
                endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }
    }
    if(event.data == 1){
        $("h2").text(player.getVideoData().title);
    }
}