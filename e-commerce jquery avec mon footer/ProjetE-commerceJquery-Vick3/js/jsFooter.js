$("footer form").hide();
$("#button").click(function(){
  $("footer form").show();
});

$("#form").ready(function() {
  $('#submit').on("click", function() {
    var $lastName = $("#lastName").val();
    var $firstName = $("#firstName").val();
    var $mail = $("#mail").val();
    var $phoneNumber = parseInt($("#phoneNumber").val());
    var phoneNumberRegex = /^[0-9]+$/;
    var nameRegex = /^[A-Za-zÂ-ÿ-]+$/;
    var mailRegex = /^[A-Za-z-_.]+[@][A-Za-z-.]+[.][A-Za-z]+$/;

    if(nameRegex.test($firstName) && nameRegex.test($lastName) && mailRegex.test($mail) && phoneNumberRegex.test($phoneNumber)) {
      alert("Le formulaire est correct");
    } else {
      alert("Une erreur s'est glissé dans votre saisie, /n veuillez renouveler la démarche");
    }

  });
});
