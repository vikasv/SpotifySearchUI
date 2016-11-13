(function(){

  'use strict'

  $(document).ready(function(){

    // For Enter keyword
    $("#inputid").keypress(function (e) {
      if (e.which == 13) {
           e.preventDefault();
           var id = $("#inputid").val();

       // validating for empty artist name entries
         if(id.length === 0){
            $("#added").empty();
            $(".searchDiv").addClass("vertical");
            $("#added").removeClass("displayDiv");
            $(".message").text("Please enter an valid artist name");
            return;
         }
        
         var type = "artist";
         $.ajax({
            url:"https://api.spotify.com/v1/search?q=" + id + "&type=" + type,
             datatype: "json",
             success: artistResults
         });
      };
    });

    // click functionality
    $("#searchArtist").click(function(){
       var id = $("#inputid").val();

       // validating for empty artist name entries
       if(id.length === 0){
          $("#added").empty();
          $(".searchDiv").addClass("vertical");
          $("#added").removeClass("displayDiv");
          $(".message").text("Please enter an valid artist name");
          return;
       }
      
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
     $("#added").append("<div class='col-xs-4 center-block thumb'><img src='" + image + "' class='img-responsive img-rounded'/><h4 class='add-artist'>"+item.name+"</h4></div>");
     $("#added").append("");
}
})();
