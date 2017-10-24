$(document).ready(function(){
   $('.delete-article').on('click', function(e){

        $target = $(e.target);
        const id = $target.attr('data-id');
        alert('Trying to delete ' + id);

        $.ajax({
            type:'POST',
            url:'/articles/delete/'+id,
            success: function(response){
               alert('Deleting Article With ID '+ id);
               window.location.href = '/';
            },
            error: function(err){
              console.log('Erreur: ' + id);
            }
        });



   });
});
