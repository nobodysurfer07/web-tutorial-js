$(function(){
    // 儲存目前作答到第幾題
    var currentQuiz = null;
    // 當按下按鈕後，要做的事
    $("#startButton").on("click", function(){
        // 還沒開始作答就從這裡開始
        if(currentQuiz == null){
            // 從0開始
            currentQuiz = 0;
            $("#question").text(questions[0].question);
            // 將選項清空(可以試著先不寫)
            $("#options").empty();
            // 選項逐個加入
            questions[0].answers.forEach(function(element, index){
                $("#options").append(
                    `<input name="options" type="radio" value="${index}">` + 
                    `<label>${element[0]}</label>` + 
                    "<br><br>"
                    );
            });
            // 按鈕文字變為next
            $("#startButton").attr("value", "Next");
        }else{
            // 已經開始
            // 尋訪哪個選項被選取
            $.each($(":radio"), function(i, val){
                if(val.checked){
                    // 是否產生結果A~D
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        // 通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        // 顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        // 將選項區域清空
                        $("#options").empty();
                        // 顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr("value", "Restart");
                    }else{
                        // 指定下一題，原始資料從1開始，所以-1
                        currentQuiz = questions[currentQuiz].answers[i][1] - 1;
                        // 顯示新題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element, index){
                            $("#options").append(
                                `<input name="options" type="radio" value="${index}">` + 
                                `<label>${element[0]}</label>` + 
                                "<br><br>");
                        });
                    }
                    // 跳脫迴圈
                    return false;
                }
            });

        }

    });
});

