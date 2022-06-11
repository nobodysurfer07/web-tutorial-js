$(function(){
    tableView();
    //let tryGetDate = document.getElementsByTagName("#myDate input")[0];
    let tryGetDate = document.getElementById("myDate");
    console.log(typeof(tryGetDate));
    tryGetDate.addEventListener("change", renewDate);
});