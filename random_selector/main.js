$(function(){
    $("input").on("click", function(){
        // alert("Hi");
        var numberOfListItem = $("#choices li").length;
        var randomChildNumber = Math.floor(Math.random() * numberOfListItem);
        let foodImage = ["image0.jpg", "image1.jpg", "image2.jpg"];

        $("h1").text($("#choices li").eq(randomChildNumber).text());
        $("img" ).attr( "src", "random_selector/images/" + foodImage[randomChildNumber] );
    });
});

