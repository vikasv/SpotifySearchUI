$(document).ready(function(){
   $("#searchArtist").click(function(){

       var id = $("#inputid").val();
       var type = "artist";
       $.ajax({
          url:"https://api.spotify.com/v1/search?q=" + id + "&type=" + type,
           datatype: "json",
           success: artistResults
       });
   }); 
   
});


function artistResults(results){ 
  var artists = results.artists;
  var items = artists.items.splice(0,5);

  //reset messages and the list of artists
  $("#added").empty();
  $(".message").text("");

  $.each(items, function(index,item){
        displayArtist(item);
  })

  if(items.length>0){ //if artists found
    $(".searchDiv").removeClass("vertical");
    $("#added").addClass("displayDiv");
  }else{ //if there are no results returned
    $(".searchDiv").addClass("vertical");
    $("#added").removeClass("displayDiv");
    $(".message").text("No artist exists with this name");
  }
};


function displayArtist(item){
     var image = (item.images.length > 0) ? item.images[0].url : "images\\Placeholder_person.png";
     $("#added").append("");
     $("#added").append("<div class='col-xs-4 center-block thumb'><img src='" + image + "' class='img-responsive img-rounded'/><h4>"+item.name+"</h4></div>");
     // $("#added").append("<h4>" + item.name + "</h4>");
     $("#added").append("");

     // $("#added").append("<div class='col-xs-2'><div>");
     // $("#added").append("<img src=" + image + " class='media-object' height='150' width='150'>");
     // $("#added").append("</div>");
     // $("#added").append("<div class='media-body'>");
     // $("#added").append("<h4 class='media-heading'>" + item.name + "</h4>");
     // $("#added").append("</div></div>");
}
