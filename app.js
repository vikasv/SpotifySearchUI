(function(){
  'use strict'
  $(document).ready(function(){
    // Enter keyword Functaionality 
    $("#inputid").keypress(function (e) {
      if (e.which === 13) {
           e.preventDefault();
           var id = $("#inputid").val();
         // validating artist name when empty
         if(id.length === 0){
            $("#added").empty();
            $(".searchDiv").addClass("vertical");
            $("#added").removeClass("displayDiv");
            $(".message").text("Please enter an valid artist name");
            return;
         }
         // Fetching artists through api call
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
       // validating artist name when empty
       if(id.length === 0){
          $("#added").empty();
          $(".searchDiv").addClass("vertical");
          $("#added").removeClass("displayDiv");
          $(".message").text("Please enter an valid artist name");
          return;
       }
       // Fetching artists through api call
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
  // When wrong artist name is given as input, error message is displayed
  if(artists.total === 0){
    $("#added").empty();
    $(".searchDiv").addClass("vertical");
    $("#added").removeClass("displayDiv");
    $(".message").text("No artist exists with this name");
    return;
  }
  else{
    // Displaying artist info when artist name is given
    var items = artists.items.splice(0,6);
    //reset messages and the list of artists
    $("#added").empty();
    $(".message").text("");
    $.each(items, function(index,item){
          displayArtist(item);
    })
    $(".searchDiv").removeClass("vertical");
    $("#added").addClass("displayDiv");
  }
};

function displayArtist(item){
  // Artists fetch results(names and images) are displayed
  var image = (item.images.length > 0) ? item.images[0].url : "images\\Placeholder_person.png";
  $("#added").append("");
  $("#added").append("<div class='col-xs-4 center-block thumb mymargin'><img src='" + image + "' class='img-responsive img-rounded'/><h4 class='add-artist'>"+item.name+"</h4></div>");
  $("#added").append("");
}
})();
