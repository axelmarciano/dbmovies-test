/*Click sur meilleur série*/
$('#best').on({
	click: function (e) {
        
    
       /* Lors du click sur meilleurs séries retire les div de l'accueil*/
     document.getElementById('back').classList.remove('hidden');
     document.getElementById('locate').classList.add('hidden');
     document.getElementById('best').classList.add('hidden');


/* Requête API vers the moviedb pour tiré un fichier liste contenant les jsons des meilleurs films */
$.ajax({

    url: "https://api.themoviedb.org/3/discover/tv?api_key=d2d93610a9719f1dd1ea6d2ea26da663&language=fr-FR&sort_by=popularity.desc&page=1&timezone=Europe%2FParis&include_null_first_air_dates=false" ,

    

    dataType: 'json',
    method: 'GET',

    success: function (data) {

       
        var arr=[];
        arr=data.results;
/* Boucle sur la liste de json */
    $.each(arr,function(index,element){
        /* La fonction append permettra de générer du html à la suite de la balise correspondante à l'id showresult */ //Ceci afin d'afficher les résultats à la chaine
    $('#showresult').append('<tr><td><img src="http://image.tmdb.org/t/p/w185/'+element.poster_path+'"/></td><td><a href="#" class="detail" id="'+element.id+'">'+element.name+'</a></td><td>'+element.overview+'</td><td>'+element.vote_average+'/10</td></tr>')

        })

}})



        
}});

// On lance une requete lors de l'entrée sur l'image de recherche
$('#searchButton').on({click:function(e){
    
    
    if($('#tags').val()==''){   
       
       alert('Le champ de recherche est vide') //Conditions requises //
       }
       else{
           /* On retire les éléments du dom de l'accueil */
           document.getElementById('back').classList.remove('hidden');
     document.getElementById('locate').classList.add('hidden');
     document.getElementById('best').classList.add('hidden');
           // On fait la requete API en modifiant le query du search par la valeur entrée dans l'input de recherche, cette valeur est rentrée dans l'input avec l'id tags.
           var query=$('#tags').val();
           var urlsearch="https://api.themoviedb.org/3/search/tv?api_key=d2d93610a9719f1dd1ea6d2ea26da663&language=fr-FR&query="+query+"&page=1&include_adult=false"
            $.ajax({

    url: urlsearch ,
        
    

    dataType: 'json',
    method: 'GET',

    success: function (data) {
        console.log(data)
       
          var arr=[];
        arr=data.results;

    $.each(arr,function(index,element){
        // On continue à utiliser append pour générer l'html
    $('#showresult').append('<tr><td><img src="http://image.tmdb.org/t/p/w185/'+element.poster_path+'"/></td><td><a href="#" class="detail" id="'+element.id+'">'+element.name+'</a></td><td>'+element.overview+'</td><td>'+element.vote_average+'/10</td></tr>')

        })
    
            
        
    }});

           
       }
    
    
    
    
}})


// On utilise la méthode $(document).on car on ne peux pas utiliser $('selecteur').on si le sélecteur a été généré dans le javascript, en effet si il n'est pas présent dès la création du DOM il faut utiliser le sélecteur document.
$(document).on('click', '.detail', function(){
    document.getElementById('showresult').classList.add('hidden');
   var idt=this.id;
    
   // On avait auparavant inséré dans l'id des <td> les id de la base de données de themoviedb
    $.ajax({

    url: "https://api.themoviedb.org/3/tv/"+idt+"?api_key=d2d93610a9719f1dd1ea6d2ea26da663&language=fr-FR" ,
        
    

    dataType: 'json',
    method: 'GET',

    success: function (data) {
       
          $('#showresultdet').append('<tr><td><img src="http://image.tmdb.org/t/p/w185/'+data.poster_path+'"/></td><td>'+data.name+'</td><td>'+data.overview+'</td><td>'+data.vote_average+'/10</td><td>'+data.seasons.length+' Saisons</td></tr>')  
    
            
        
    }});
    
})

// On relance le DOM lors du click sur le bouton retour car c'est une application one-page (sinon on utilise location.href='index.html' ça marche aussi)

$('#back').on({click:function(e){
    
    location.reload();
}})


// On lance lors du click sur #locate le processus de questionnement
$('#locate').on({click:function(e){
    
    document.getElementById('back').classList.remove('hidden');
     document.getElementById('locate').classList.add('hidden');
     document.getElementById('best').classList.add('hidden');
    document.getElementById('question').classList.remove('hidden')
    
    
}})

// On réutilise la méthode du click sur document car les élements utilisé (ici #q1f) n'étaient pas présent lors de la création du DOM.
$(document).on('click', '#q1f', function(){
    var answer1=$('input[name=second]:checked').val();
    document.getElementById('question').classList.add('hidden');
     // J'ai inséré les id de genres de la base de donnée de themoviedb directement dans la value des inputs de l'html que je récupère ici pour les insérer dans l'html.
    // On lance l'url avec la valeur récupéré dans l'id de l'input correspondant aux genres
       var urlsearch="https://api.themoviedb.org/3/discover/tv?api_key=d2d93610a9719f1dd1ea6d2ea26da663&language=fr-FR&sort_by=popularity.desc&page=1&with_genres="+answer1+"&include_null_first_air_dates=false"
            $.ajax({

    url: urlsearch ,
        
    

    dataType: 'json',
    method: 'GET',

    success: function (data) {
        console.log(data)
       
          var arr=[];
        arr=data.results;

    $.each(arr,function(index,element){
        // On génère l'html
    $('#showresult').append('<tr><td><img src="http://image.tmdb.org/t/p/w185/'+element.poster_path+'"/></td><td><a href="#" class="detail" id="'+element.id+'">'+element.name+'</a></td><td>'+element.overview+'</td><td>'+element.vote_average+'/10</td></tr>')

        })
    
            
        
    }});

           
       })
               
    

    
    

