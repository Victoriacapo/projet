// partie de florent qui gere le panier
var tableauProduits = [];
var PrixTotalPanier = 0;
var quantiteProduitPanier;
window.tableauPanier = [];


$(function(){


  // fonction global qui ajoute au panier modal  un produit
  // cette fonction utilise uniquement la partie visible (HTML) et varie en fonction
  // des données qui lui sont indiqué en paramètre de la fonction
  window.addProduitDOMPanier = function(index, idProduit, title, qt, price){
    var modalProduitElement = `<div class="row produitPanier" data-id-panier="${index}">
      <div class="col-1 idProduit">
        ${idProduit}
      </div>
      <div class="col-5 col-lg-6" style="white-space: nowrap;overflow:visible;">
        ${title}
      </div>
      <div class="col-8 col-lg-2 text-right" style="white-space: nowrap;min-width:72px;padding:0;">
        <input type="button" class="buttonMoinQtPanier" value="<" style="display:inline;width:15px;padding:0;" />
        <input type="number" min="1" max="99" name="quantite" value="${qt}" style="width:40px;text-align:center;" />
        <input type="button" class="buttonPlusQtPanier" value=">" style="display:inline;width:15px;padding:0;" />
      </div>
      <div class="col-3 text-right">
        <div class="">
          ${price}€
        </div>
        <div class="">
          <a href="#" class="supprimerProduit">Supprimer</a>
        </div>
      </div>
    </div>`;
    // ajoute du html paramètrer dans le contenu de la fenetre modal. ( cette fenetre est le panier)
    $(".modal-body .container-fluid").append(modalProduitElement);
  }

  // rafraichi le panier
  window.paintPanier = function(){
    // vide le contenu du panier pour le remplir par la suite
    $(".modal-body .container-fluid").html('');
    // variable global pou le total de la commande
    window.PrixTotalPanier = 0;
    // compte le nombre d'article dans le panier
    var countIndex = 0;
    // si les données du panier ne sont pas vide
    window.tableauPanier.forEach(function(element, index) {

      // chaque données du panier est appliquer au html ajouter au modalProduitElement
      // Chaque element du panier est lui aussi un tableau (voir fonction ajouterAuPanier() )
      addProduitDOMPanier(index, element[0], element[1], element[2], element[3])
      window.PrixTotalPanier  += Number(element[3])*Number(element[2]);
      $("#nbrTotalProduitPanier").text(++countIndex);
    })

    // si il y a 1 produit, le mot produit afficher dans le titre du panier ne prend pas de S
    if( countIndex <= 1 ){
      $(".pluriel").css("display", "none") // on cache le S
    }else{ // si il y a au moins 2 produits
      $(".pluriel").css("display", "inline") // on affiche le S
    }

    // si il a zero produit dans le panier (il est vide)
    if( countIndex > 0){
      $("#commanderPanier").prop('disabled', false); // desactivation du bouton commander
      $(".panier-vide-non-vide").css("display", "block"); // affichage qui dit que le panier est vide
      $(".panier-vide").css("display", "none"); // on cache qu'il y a O produtis pour un total x
    }else{ // si le panier n'est pas vide
      $("#commanderPanier").prop('disabled', true); // activation du bouton commander dans le panier
      $(".panier-vide-non-vide").css("display", "none");// on cache la phrase qui dit que le panier est vide
      $(".panier-vide").css("display", "block");// on affiche la phrase qu'il y a x produits pour un total de x
    }
    // l'affichage du prix total sera limité a 2 chiffres apres la virgule.
    $("#priceTotalProduitPanier").text(Number.parseFloat(window.PrixTotalPanier).toFixed(2));

  }

  // vérifie qu'un produit existe dans le panier
  window.referenceExist = function(idProduit){
    // on memorise combien de produit il y a dans le panier
    var n = window.tableauPanier.length;
    for( var i=0; i <n ; i++){// pour chaque produit (on bloucle)
      var tabProduit = window.tableauPanier[i]; // recuperation du produit (c'est un tableau le produit)
      if( (result = jQuery.inArray(idProduit,tabProduit)) != -1 ){ // recherche dans le tableau produit un id de produit
        if( result == 0){ // si le resultat est zero c'est que c'est la colonne id, qui a ete detecter avec ce numero d'id.
          // ont cherche qu'un seul id pour repondre si le produit existe,
          // ont peux donc faire un retour de la reponde mais a la place de
          // dire oui (true) on retourne la quantité car la colonne 2 contient
          //  la valeur de la quantité de ce produit et c'est tres pratique de
          // récuperer la quantité à la place de recreer une fonction uniquement pour obtenir la quantitee actuellement
          return tabProduit[2];
        }
      }
    }
    return false; // retourne non (false) si la produit n'est pas trouver parmis les id produit qui sont stocker dans les donnees panier

  }

  // fonction qui modifier la quantité d'un produit
  window.modifierQTProduitPanier = function(idProduit, qtProduit){
    // on memorise combien de produit il y a dans le panier
    var n = window.tableauPanier.length;
    for( var i=0; i <n ; i++){ // pour chaque produit (on bloucle)
      var tabProduit = window.tableauPanier[i]; // recuperation du produit (c'est un tableau le produit)
      if( (result = jQuery.inArray(idProduit,tabProduit)) != -1 ){
        if( result == 0){// si le resultat est zero c'est que c'est la colonne id, qui a ete detecter avec ce numero d'id.
          tabProduit[2] = Number(qtProduit); // modification de la quatité du produit
          return tabProduit[2]; // on termine la recherche de les donnnees du panier car  on a deja trouver et modifier
        }
      }
    }
    return false; // retourne faux si le produit demander n'existe pas
  }

  //fonction qui ajoute un produit dans le panier.
  // Cette fonction attend l'id du ptoduit, sont titre et sont prix.
  // cette fonction est destinée a etre utilisé pour les boutons qui ajoutes au panier
  // cela simplifie le fonctionnement dont le fait de ne pas preciser la quantite.
  window.ajouterAuPanier = function(idProduit, titreProduit, prixproduit){
    if(  window.referenceExist(idProduit) !== false ){ // si le produit existe
      var newQt = Number(window.referenceExist(idProduit)) + 1; // recupere sa quanite et on l'augmenter car c'est un produit en double ou plus
      window.modifierQTProduitPanier(idProduit, newQt); // on affecte au produit sa nouvelle valeur
    }else{
      // si le produit n'existe pas dans le panier alors on l'ajoute au données du panier
      window.tableauPanier.push([idProduit, titreProduit, 1, prixproduit]) // sa quantite sera forcément de 1
    }
    // rafraichissement de l'affichage du panier modal
    paintPanier();
  }








  // rafraichissement de l'affichage du panier modal
  paintPanier();

  // gère la suppresion du produit en rapport avec l'emplacement du boutton (lien)
  // qui lui meme est sur le produit visible dans le panier
  $(".modal-body").on("click", ".supprimerProduit",function(){
    // supprime le produit (balise parente) par rapport à sont emplacement dans le panier
    var idPanierDelete =  $(this).parent().parent().parent().attr('data-id-panier');
    // supprimer aussi la donnée du panier qui mémorise le produit dans le panier
    delete window.tableauPanier[idPanierDelete];
    paintPanier(); // rafraichi l'affichage du panier
  })

  // fonction qui met en relation les champs html 'quantité du panier' vers les données du panier.
  var inputQtUpdatePanier = function(){
    var tabInputQt = $("input[name=quantite]"); // creer un tableau de champ html quantitees
    var n = $("input[name=quantite]").length // mémorise le nombre d'element html que contient la variable tabInputQt
    for(var i=0; i<n; i++){ // pour chaque element du tableau
      // recuperation de l'index tableau des données du panier qui on ete stocker dans le html grace
      // à l'attribut data-id-panier
      var indicePanier = $(tabInputQt[i]).parent().parent().attr("data-id-panier");
      // pour rappel chaque produit est un tableau et la colonne 2 soit la 3eme pour un etre humain
      // stock la quantité de ce produit.
      // Pour chaque quantitées de produit, on change en fonction de la valeur de son champ quantité du panier
      window.tableauPanier[indicePanier][2] = tabInputQt[i].value; // tabInputQt[i].value est la valeur du champ quantité
    }
    paintPanier(); // rafraichissement de l'affichage du panier
  }
  // lorsqu'une touche du clavier est relaché dans le champ quantité du panier
  $(".modal-body").on("keyup", "input[name=quantite]",function(){
    inputQtUpdatePanier(); // mise a jours des quantité indiquer dans le html du panier vers les donnees du tableau
  })
  // lorsqu'un clique est fait dans le champ quantité du panier
  $(".modal-body").on("click", "input[name=quantite]",function(){
    inputQtUpdatePanier(); // mise a jours des quantité indiquer dans le html du panier vers les donnees du tableau
  })


  // lorsqu'un clique est fait sur le bouton moins (signe inferieur) de la quantité du panier
  $(".modal-body").on("click", ".buttonMoinQtPanier",function(){
    var newVal = (Number($(this).next().val())-1) // recuperation de la valeur +1 du champ suivant qui est la quantité dans le html du panier
    // Si la valeur modifier par le client est inferieur a 1,
    if(newVal < 1){
      newVal = 1; //on force cette meme valeur a 1 pour limité a 1 la quantité du produit
    }
    // change la valeur quantitee par la nouvelle valeur qui a ete augmenter de +1 si
    // sa reste ente 1 et 99 sinon la nouvelle valeur correspond a la limite ci dessus
    $(this).next().val( newVal  )
    inputQtUpdatePanier(); // mise a jours des quantité indiquer dans le html du panier vers les donnees du tableau
  })

  // lorsqu'un clique est fait sur le bouton plus (signe supperieur) de la quantité du panier
  $(".modal-body").on("click", ".buttonPlusQtPanier",function(){
    var newVal = (Number($(this).prev().val())+1)// recuperation de la valeur -1 du champ suivant qui est la quantité dans le html du panier
    // Si la valeur modifier par le client est supperieur a 99,
    if(newVal > 99){
      newVal = 99;//on force cette meme valeur a 99 pour limité a 99 la quantité du produit
    }
    // change la valeur quantitee par la nouvelle valeur qui a ete augmenter de +1 si
    // sa reste ente 1 et 99 sinon la nouvelle valeur correspond a la limite ci dessus
    $(this).prev().val( newVal  )
    inputQtUpdatePanier();// mise a jours des quantité indiquer dans le html du panier vers les donnees du tableau
  })

});
