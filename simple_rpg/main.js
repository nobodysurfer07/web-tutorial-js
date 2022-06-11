let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
// mapArray - 決定地圖中格子的元素
// ctx - HTMLS Canvas用
// currentImgMainX, currentImgMainY - 決定主角座標
// imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
const gridLength = 100;
var sources = {
    Mountain:"simple_rpg/images/material.png",
    Enemy:"simple_rpg/images/Enemy.png"
};

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
}

// initial
$(function(){
    // 設定地形、擺上主角    
    mapArray = [ // 0-可走, 1-障礙, 2-終點, 3-敵人
        [0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 3, 0],
        [3, 1, 0, 0, 2]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "simple_rpg/images/moomin.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };


    // 主角繪製到畫面上，怕圖片物件還沒載入完成
    imgMain.onload = function(){
        ctx.drawImage(imgMain, 0, 0, 120, 200, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    }

    // 擺上障礙物、敵人
    // imgMountain = new Image();
    // imgMountain.src = "images/material.png";
    // imgEnemy = new Image();
    // imgEnemy.src = "images/Enemy.png";
    // imgMountain.onload = function(){
    //     imgEnemy.onload = function(){
    //         for(var x in mapArray){
    //             for(var y in mapArray[x]){
    //                 if(mapArray[x][y] == 1){
    //                     // draw barrier
    //                     ctx.drawImage(imgMountain, 288, 193, 32, 32, y*gridLength, x*gridLength, gridLength, gridLength);
    //                 }else if(mapArray[x][y] == 3){
    //                     // draw enemy
    //                     ctx.drawImage(imgEnemy, 7, 40, 104, 135, y*gridLength, x*gridLength, gridLength, gridLength);
    //                 }
    //             }
    //         }
    //     }
    // }

    loadImages(sources, function(images){
        for(var x in mapArray){
        for(var y in mapArray[x]){
            if(mapArray[x][y]==1){
                //Draw Mountain
                ctx.drawImage(images.Mountain, 288,192,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
            }else if(mapArray[x][y]==3){
                //Draw Enemy
                ctx.drawImage(images.Enemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
            }
        }
    }});
});

// 處理使用者按下按鍵
$(document).on("keydown", function(event){
    // cutImagePositionX - 決定主角的臉朝向哪個方向
    let targetImg, targetBlock, cutImagePositionX;
    // 1. 先判斷使用者按了什麼
    // 2. 判斷目標位置那一格是什麼
    // 3. 決定要做的事情(只是轉頭/ 可以過去/ ..)
    // debugger;
    // 主角的目標座標
    targetImg = {   // Canvas(x,y)
        "x": -1,
        "y": -1
    };
    // 主角的目標(對應2維陣列)
    targetBlock = {     // Data 2D array
        "x": -1,
        "y": -1
    };

    // 避免鍵盤預設行為發生(捲動放大縮小等等)
    // 判斷使用者按下什麼並推算目標座標
    event.preventDefault();
    //debugger;
    console.log(event.key);
    switch(event.key){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength;
            targetImg.y = currentImgMain.y;
            // 臉朝左
            cutImagePositionX = 120;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y - gridLength;
            // 臉朝上
            cutImagePositionX = 255;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength;
            targetImg.y = currentImgMain.y;
            // 臉朝右
            cutImagePositionX = 380;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y + gridLength;
            // 臉朝下
            cutImagePositionX = 0;
            break;
        // 其他按鍵不處理
        default:
            return;
    }

    // 確認目標位置不會超過地圖
    if(targetImg.x <= 400 && targetImg.x >= 0 && targetImg.y <= 400 && targetImg.y >= 0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }

    // 清空主角原本所在位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    if(targetBlock.x != -1 && targetBlock.y != -1){

        switch(mapArray[targetBlock.x][targetBlock.y]){
            // 一般道路(可移動)
            case 0:
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            // 有障礙物(不可移動)
            case 1:
                $("#talkBox").text("No!");
                break;
            // 終點(可移動)
            case 2:
                $("#talkBox").text("Arrive!");
                cutImagePositionX = 528;
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            // 敵人(不可移動)
            case 3:
                $("#talkBox").text("Attack!");
                cutImagePositionX = 650;
                break;
        }
    }else{
        $("#talkBox").text("Boundary!");
    }

    // 重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 125, 200, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

});