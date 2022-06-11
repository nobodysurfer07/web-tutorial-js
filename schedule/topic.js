var topic = [
    "停課 - 尚未開學",
    "停課 - 國定假日",
    "環境準備",
    "隨機性",
    "重複性",
    "條件判斷"
];

var startDate = new Date();
function setMonthAndDay(startMonth, startDay){
    // month and date setting
    startDate.setMonth(startMonth - 1, startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    
};

function renewDate(){
    //let dd = $("input").val().slice(8);
    //let mm = $("input").val().slice(5,7);
    let dd = $(this).val().slice(8);
    let mm = $(this).val().slice(5,7);  
    // debugger
    setMonthAndDay(mm, dd);
    tableView();
}

function tableView(){
    $("#courseTable").empty();
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    // 1 sec -> 1000 millisec
    let millisecsPerDay = 24 * 60 * 60 * 1000;

    for( var i = 0; i < topic.length; i++){
        // get timestamp
        let getTimestamp = startDate.getTime() + 7 * i * millisecsPerDay;
        // get date
        let getDate = (new Date(getTimestamp));
        // ISO date string
        let getISOString = getDate.toISOString();
        // slice
        let dateSlice = getISOString.slice(5,10)
        let dateFormat = dateSlice.split("-")[0] + "/" + dateSlice.split("-")[1]
        // let withoutYear = formatDateString.slice(5);

        let a = `<td>`;
        if (topic[i].includes("停課")){ a = `<td class="grayFont">`};
        // let a = `<td class="grayFont">`;
        $("#courseTable").append(
            "<tr>" + 
            `<td>${i + 1}</td>` + 
            `<td>${dateFormat}</td>` + 
            // `<td>${topic[i]}</td>` + 
            a + `${topic[i]}</td>` + 
            "</tr>"
        );
    }
}