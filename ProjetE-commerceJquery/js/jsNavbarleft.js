$(function() {

  // Affiche seulement les composants cocher (version codeurh24)
  $("[type='checkbox']").change(function(){
    var checkboxs = $("input:checked");
    var n = checkboxs.length;
    var displays = [];
    for(var i=0; i<n; i++){
      displays.push(checkboxs[i].name);
    }
    n = displays.length;
    if( n == 0){
      $(".category[data-category]").show();
    }else{
      $(".category[data-category]").hide();
    }
    for(var i=0; i<n; i++){
      if(displays[i] == "processor"){
        $(".category[data-category=processor]").show();
      }
      if(displays[i] == "motherboard"){
        $(".category[data-category=motherboard]").show();
      }
      if(displays[i] == "graphics-card"){
        $(".category[data-category=graphics-card]").show();
      }
      if(displays[i] == "ram"){
        $(".category[data-category=ram]").show();
      }
    }
    return false;
  });


  var searchWordProduct = function(){
    var affichage = []; // memorise les balises qui corespondent a la recherche
    var val = $("#inputSearchOfProduct").val(); // recupere la valeur de recherche taper par le visiteur
    val = val.toLowerCase(); // rend la recherche insensible a la majuscule partie 1 sur 2.
    // RECHERCHE PAR TITRE PRODUIT
    var tabCatH1 = $(".category:visible h1") // liste tout les titres de produits

    var n = tabCatH1.length; // compte le nombre de titre produit pour la boucle for
    for(var i=0; i<n; i++){ // pour chaque titre de produit

      var text = $(tabCatH1[i]).text(); // on recuperer le contenu text du titre
      text = text.toLowerCase();// rend la recherche insensible a la majuscule partie 2 sur 2.

      if(text.indexOf(val) != -1){ // si une partie du titre corespond a la recherche

        var baliseH1 = $(".category h1")[i]; // on met la balise en memoire
        // recuperation de la balise categorie du titre recherche

        var parentCategory =  $(tabCatH1[i]).parent().parent().parent().parent() ;

        // ajout (a la liste de resultats de recherche)de la balise que l'ont vient de recuperer
        affichage.push(parentCategory);
      }

    }//for

    // pour n'afficher que les balises corespondant a la recherche ont cache tout les produits
    $(".category").hide();
    // compte le nombre de resultat de la recherche
    n = affichage.length;
    for(var i=0; i<n; i++){ // pour chaque resultat ont obtient une balise javascript
      $(affichage[i]).show(); // jquery affiche cette balise
    }
    return false; // fin de la fonction
  }
  var searchPrice = function(){
    var affichage = []; // memorise les balises qui corespondent a la recherche

    var valMin = Number($("#inputSearchPriceMinProduct").val());
    var valMax = Number($("#inputSearchPriceMaxProduct").val());

    var tabCatPrice = $(".font-weight-bold:visible");
    //console.log(tabCatPrice);
    var n = tabCatPrice.length;

    for(var i=0; i<n; i++){ // pour chaque titre de produit
      var price = $(tabCatPrice[i]).text()
      price = price.replace("€", ".");
      price = Number(price);
      if(  price >= valMin && price <= valMax  && valMin <= valMax ){
        var parentCategory =  $(tabCatPrice[i]).parent().parent().parent().parent().parent().parent();
        affichage.push(parentCategory);
      }else if( price >= valMin && valMax == 0 ){
        var parentCategory =  $(tabCatPrice[i]).parent().parent().parent().parent().parent().parent();
        affichage.push(parentCategory);
      }else if( price <= valMax && valMin == 0 ){
        var parentCategory =  $(tabCatPrice[i]).parent().parent().parent().parent().parent().parent();
        affichage.push(parentCategory);
      }
    }//for
    // pour n'afficher que les balises corespondant a la recherche ont cache tout les produits
    $(".category").hide();
    // compte le nombre de resultat de la recherche
    n = affichage.length;
    for(var i=0; i<n; i++){ // pour chaque resultat ont obtient une balise javascript
      $(affichage[i]).show(); // jquery affiche cette balise
    }
  }




  $("#btnSearchOfProduct").click(function(){
    searchWordProduct();
    return false;
  });
  $("#inputSearchOfProduct").keyup(function(){
    var text = $(this).val();
    if( text.length == 0){
      $("div[data-category]").css("display", "flex");
      searchPrice()
    }
  });


  $("#btnSearchPriceProduct").click(function(){
    searchPrice()
    return false;
  });
  $("#inputSearchPriceMinProduct, #inputSearchPriceMaxProduct").keyup(function(){
    var text = $(this).val();
    if( text.length == 0){
      $("div[data-category]").css("display", "flex");
      searchWordProduct();
    }
  });


  $("#triProduit").change(function(){
    //console.log(this.value);
    var tabCatPrice = $(".product .font-weight-bold:visible");
    var n = tabCatPrice.length;
    var   affichage = [];
    var price;
    for(var i=0; i<n; i++){
      var parentCategory =  $(tabCatPrice[i]).parent().parent().parent().parent().parent().parent();

      price = $(tabCatPrice[i]).text()
      price = price.replace("€", ".");
      price = Number(price);

      affichage.push([parentCategory, price]);
    }
    //console.log(affichage);
    affichage.sort(function(a, b) { return a[1] - b[1]; });
    if( this.value != "prixCroissantPlus"){
      affichage.reverse();
    }

    $(".product").html("");
    n = affichage.length;
    for(var i=0; i<n; i++){
      $(".product").append(affichage[i][0]);
    }
    //  console.log(affichage[0][0]);

  });
});
