$(function() {
  $("#top-des-ventes i").click(function() {
    var number = Number($(this).attr("data-id-product"));
    var amount = referenceExist(number);
    $(".product i[data-id-product=" + number + "]").parent().parent().find(".amount").text(amount);
  });

  $(document).on('click','.navbar-collapse.show',function(e) {
    $(this).collapse('hide');
  });
});
