var getURLDataServer = 'http://localhost/projetV2/server/api/hommes.php' ;
// var fclick = document.getElementById('femmeClick') ;

fetch(getURLDataServer)
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        display(data)
    })

function display(data) {
    var toAppend='';
    data.forEach(shoe => {
        toAppend += `  
                    <div class="qzd1">
                    <div><img src= "./img/${shoe.img}" class="artH1" onclick="getOneShoe(${shoe.id})"></div>
                    <div>${shoe.name}<nav>${shoe.price}</nav></div>
                    </div>
                    `;
    });
    document.querySelector('#cont').innerHTML = toAppend;
}

function getOneShoe(id) {
    console.log('atttpi');
    
    fetch(`http://localhost/projetV2/server/api/singleitem.php?id=${id}`)
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        singleView(data)
    })
}
