/*// callback for successful getConfiguration call
        function configSuccessCallback(data) {
            'use strict';
            // Set the base image url to the returned base_url value plus w185, shows posters with a width of 185 pixels.
            // Store it in localStorage so we don't make the configuration call every time.
            localStorage.setItem('tmdbImageUrlBase', JSON.parse(data).images.base_url + 'w185');
            $('#results').text('tmdbImageUrlBase downloaded from themoviedb.org: ' + localStorage.getItem('tmdbImageUrlBase'));
        }
        // callback for getConfiguration call error
        function configErrorCallback(data) {
            'use strict';
            $('#results').text('Error getting TMDb configuration! ' + JSON.parse(data).status_message);
        }
        // check localStorage for imageBaseUrl, download from TMDb if not found
        if (localStorage.getItem('tmdbImageUrlBase')) {
            $('#results').text('tmdbImageUrlBase retrieved from localstorage: ' + localStorage.getItem('tmdbImageUrlBase'));
        } else {
            theMovieDb.configurations.getConfiguration(configSuccessCallback, configErrorCallback);
        }

        // callback for successful movie search
        function successCallback(data) {
            'use strict';
            $('#results').text('');
            data = JSON.parse(data);
            //console.log(data);
            // we just take the first result and display it
            if (data.results && data.results.length > 0) {
                var imageUrl = localStorage.getItem('tmdbImageUrlBase') + data.results[0].poster_path;
                $('#results').append('Title: <b>' + data.results[0].title + '</b><br />');
                $('#results').append('Movie Id: ' + data.results[0].id + '<br />');
                $('#results').append('<img src="' + imageUrl + '" />');
            } else {
                $('#results').text('Nothing found');
                console.log('Nothing found');
            }
        }
        // callback for movie search error
        function errorCallback(data) {
            'use strict';
            //console.log('error: \n' + data);
            $('#results').text('Error searching. ' + JSON.parse(data).status_message);
        }

        // search button click event handler
        $('#searchButton').click(function () {
            'use strict';
            var searchTerm = $('#movieNameInput').val(),
                searchYear = $('#movieYearInput').val(),
                options = { "query": searchTerm };
            //options.query = searchTerm;
            if (!isNaN(searchYear)) {
                options.year = searchYear;
            }
            theMovieDb.search.getMovie(options, successCallback, errorCallback);
        });

*/


/*var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.themoviedb.org/3/movie/550?api_key=d2d93610a9719f1dd1ea6d2ea26da663');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    alert(xhr.responseText);
  }
};
// envoi d'une chaine de caractères:
xhr.send('ceci est un exemple de données envoyées');*/


$('#best').on({
	click: function (e) {
        
    
       
     document.getElementById('back').classList.remove('hidden');
     document.getElementById('locate').classList.add('hidden');
     document.getElementById('best').classList.add('hidden');



$.ajax({

    url: "https://api.themoviedb.org/3/discover/tv?api_key=d2d93610a9719f1dd1ea6d2ea26da663&language=fr-FR&sort_by=popularity.desc&page=1&timezone=Europe%2FParis&include_null_first_air_dates=false" ,

    

    dataType: 'json',
    method: 'GET',

    success: function (data) {

        var arr=[];
        arr=data.results;

    $.each(arr,function(index,element){
        console.log(element)
    $('#showresult').append('<tr><td><img src="http://image.tmdb.org/t/p/w185/'+element.poster_path+'"/></td><td>'+element.name+'</td><td>'+element.overview+'</td><td>'+element.vote_average+'/10</td></tr>')

        })

}})



        
}});