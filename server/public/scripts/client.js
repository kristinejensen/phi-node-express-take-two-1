$(document).ready(function(){
  getFishData();
  function getFishData() {
    $.ajax({
      type: 'GET',
      url: '/fish',
      success: function(response) {
        $('#fishTank').empty();
        for (var i = 0; i < response.length; i++) {
          $('#fishTank').append('<li>' + response[i].name + '</li>');
        }
      }
    });
    
    $.ajax({
      type: 'GET',
      url: '/fish/first/name',
      success: function(response) {
        $('#firstFishy').text(response);
      }
    });
  }

  $('#newFishButton').on('click', function(){
    var newFishObject = {};
    newFishObject.name = $('#newFishName').val();
    $.ajax({
      type: 'POST',
      url: '/fish/new',
      data: newFishObject,
      success: function(response){
        console.log(response);
        getFishData();
      },
      error: function(error) {
        $('#errorMessage').append('Error! Fish must contain a name: ', error.responseText + ' ' + error.status);
        console.log('error', error);
      }
    });
  });
});
