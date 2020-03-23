
function singleView(res) {
    var data = res[0];

// document.querySelector('#theCarrousel').remove();
document.querySelector('#single').innerHTML =`

<div class="col-s-">
    <div class="spGen">
        <div class="singleProductPage">
                    <img src="./img/${data.img}" class="singleProductCss"  id="imgDefault" style="width:500px" > 
            <div class="reactAnglePage" >
                    <img src="./img/${data.img1}" class="reactAj1" id="imgChange1" onclick="imgDefault.src = this.src" >
                    <img src="./img/${data.img2}" class="reactAj2" id="imgChange2" onclick="imgDefault.src = this.src">
                    <img src="./img/${data.img3}" class="reactAj3" id="imgChange3" onclick="imgDefault.src = this.src">
                    <img src="./img/${data.img}" class="reactAj4" id="imgChange4" onclick="imgDefault.src = this.src">
            </div>
        </div>

        <div class="texte">
            Chaussure pour Homme 140$ <br>
            <span>Nike React Element 55 Premium</span>

            <p> Selectionner la taille </p>
            
            <form method="post" name="form1">
                <select name="taille">
                    <option value="40" class="">40</option>
                    <option value="41" class="">41</option>
                    <option value="42" class="">42</option>
                    <option value="43" class="">43</option>
                    <option value="44" class="">44</option>
                    <option value="45" class="">45</option>

                </select>
            </form>

            <button class = "btn" >Ajouter au panier</button> <br>

            <p> La Nike React Element 55 s'inspire des chaussures de running classiques, telles que la Nike
                Internationalist, et intègre la technologie Nike React.
            </p><br>

            <ul>
                <li>Couleur affichée : Argent métallique/Platine pur/Gris foncé/Noir</li>
                <li>Article : CI3835-001</li>
            </ul>
            <div class="btn">


                <div id="lrg" onclick="delLivraison()" >Livraison et retour gratuits</div>
            </div>
            <div id="texteLivraison">
                Livraison standard gratuite avec votre compte NikePlus. <br>
                <br>
                <ul>
                    <li>
                         Le délai des livraisons standard est de 2 à 4 jours ; nous effectuons des livraisons 5 jours sur 7.
                    </li>
                    <li>
                        Pour une commande passée avant 13 heures avec option de livraison le lendemain, du lundi au jeudi.
                    </li>
                    <li>
                        Possibilité de retirer les commandes en magasin Nike et dans une centaine de points de retrait
                         faciles d'accès.
                    </li>
                    <li>
                        Vous pouvez retourner votre commande gratuitement, quelle que soit la raison, dans un délai de 60
                                            jours.
                    </li>
                </ul>

            </div>
        </div>
    </div>
</div>
<script>

</script>
`

}

var formDiv = document.getElementById('texteLivraison');
var btnToggle = document.getElementById('lrg'); 
var txtClose = 'Fermer';
var txtOpen = 'Livraison et retour gratuits';

    formDiv.style.display = 'none'; 

function delLivraison() {
    
    if (lrg.textContent == txtOpen) {
        formDiv.style.display = 'block'
        btnToggle.textContent = txtClose
    } else {
        formDiv.style.display = 'none';
        btnToggle.textContent = txtOpen;
    }
}
