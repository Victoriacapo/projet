$(function () {

  window.counter = function(fab) {
    var number = Number($(fab).attr("data-id-product"));
    var amount = referenceExist(number);
    $(fab).parent().parent().parent().parent().find(".amount").text(amount);
  }

  $("i").click(function() {
    counter(this);
  });

  $(".modal-body").on("click", ".buttonPlusQtPanier, .buttonMoinQtPanier",function() {
    var number = Number($(this).parent().parent().find(".idProduit").text());
    var amount = referenceExist(number);
    $("i[data-id-product=" + number + "]").parent().parent().find(".amount").text(amount);
  });

  $(".modal-body").on("click", ".supprimerProduit",function() {
    var number = Number($(this).parent().parent().parent().find(".idProduit").text());
    $("i[data-id-product=" + number + "]").parent().parent().find(".amount").text("");
  });
});
