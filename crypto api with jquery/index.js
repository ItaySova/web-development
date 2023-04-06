$( document ).ready(function() {
    $("#overlay").hide();
    $("#aboutSection").hide();
    $("#livereportsSection").hide();
    let myList = [];
    localStorage.setItem("coins_list", JSON.stringify(myList));
    const coins = $("#actutalTable")
    $(`.navButtons`).bind("click", function(event){
        event.preventDefault();
        displaySection(event.target.id)
    });
    $.ajax({url:'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'})
    .then(data => data.splice(0,100))
    .then(result => {
        result.forEach(element => {
            const coin = document.createElement("div")
            coin.setAttribute('class',"col");
            coin.setAttribute('id',element.symbol);
            coin.innerHTML = `<div id=${element.id} class="card">
                <div class="card-body">
                <h5 class="card-title">${element.symbol}</h5>
                <div class="form-check form-switch form-check-reverse">
                <input class="form-check-input" type="checkbox" id="flexSwitchCheckReverse">
                <label class="form-check-label" for="flexSwitchCheckReverse"></label>
                </div>
                <p class="card-text">${element.name}</p>
                <button id=${element.id} class="btn btn-primary info-btn">More info</button>
                <div id=${element.id}moreInfo></div>
                </div>`;
                coins.append(coin);
                $(`#${element.id}moreInfo`).data("time", $.now());
                $(`#${element.id}moreInfo`).toggle()
            });
        })
    .then(() => {
        $("#actutalTable button").bind("click", function(event){
            let moreInfoSection = $(`#${event.target.id}moreInfo`);
            $(moreInfoSection).toggle();
            let isInfoStillValid = $.now() - $(moreInfoSection).data('time') >= 10000;
            if ($(moreInfoSection).text() === "" || isInfoStillValid){
                $(moreInfoSection).empty();
                getData(event.target.id)
                .then(result => addMoreInfo(result,event.target.id));
                }
            })
        })
    .then(() => {
        $('input[type=checkbox]').bind("click", function(){
            console.log(this)
            let inputId = $(this).parent().siblings()[0].innerText;
            let localList = getCoinList();
            if(this.checked){
                if (localList.length < 5){
                    localList.push(inputId);
                    updateCoinList(localList);
                } else {
                    this.checked = false;
                    modalInit(localList);
                }
            } else {
                removeCoinFromList(inputId);
            }
        })
    })
    .then(() => {
            $( "form" ).submit(function(event){
                console.log('test');
                event.preventDefault();
                let searchInput = $( "input" ).first().val();
                getCoinList();
                searchFunction(searchInput);
            });
        })
        .catch(error => console.log(error.massage));
    });

function displaySection(sectionId){
    $(".navButtons").each(function (){
        if ($(this).attr("id") !== sectionId){
            $(this).removeClass("btn btn-primary");
        } else {
            $(this).addClass("btn btn-primary");
        }
    });
    $("#aboutSection").hide();
    $("#maintable").hide();
    $("#livereportsSection").hide();
    if(sectionId === "about"){
        $("#aboutSection").show();
    }
    if(sectionId === "home"){
        $("#maintable").show();
    }
    if (sectionId === "livereports"){
        $("#livereportsSection").show();
    }
}

async function getData(id){
    $("#overlay").show();
    try {
        const test = await $.ajax({method: 'GET',cache: true ,url:`https://api.coingecko.com/api/v3/coins/${id}`,
        error: function(xhr) {
            console.log(`status: ${xhr.status}`);
        },
        success: function(result){
            console.log('ajax successfull, caching data in local storage');
            localStorage.setItem(`${id}`,JSON.stringify(result)); //
        }});
        return test;
    } catch (error){
        console.log('catching');
        alert(error.massage);
    } finally{
        $("#overlay").hide();
    }
}

function addMoreInfo(result,id){
        if (typeof(result) === 'undefined'){
            alert('get request returned invalid input');
            return;
        }
        const details = document.createElement("div")
        details.setAttribute('class',`info`);
        details.innerHTML = `
                <p><img src="${result.image.small}" alt="${id}"></p> 
                <p> The price in USD is $${result.market_data.current_price.usd}</p>
                <p> The price in EUR is €${result.market_data.current_price.eur}</p>
                <p> The price in ILS is ₪${result.market_data.current_price.ils}</p> `;
        let currentTimeStamp = $.now();
        $(`#${id}moreInfo`).data("time", currentTimeStamp);
        $(`#${id}moreInfo`).append(details)
}

function modalInit(coinsList){
    $('#coinList').empty();
    coinsList.forEach(element => {
        const coinToggle = document.createElement("li");
        coinToggle.setAttribute('class', 'form-check form-switch');
        coinToggle.setAttribute('id', element);
        coinToggle.innerHTML = `
        <label class="form-check-label" for="flexSwitchCheckChecked">${element}</label>
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>`;
        $('#coinList').append(coinToggle);
    })
    $('.modal').show();
    $('#modal-close-btn').bind("click",function(){
        $('.modal').hide();
    });
    $('#modal-save-btn').bind("click", function(){
        $('#coinList li').each(function(){
            const currInput = $(this).find('input').prop("checked");
            if (!currInput){
                let coinToRemove = $(this).attr("id")
                removeCoinFromList(coinToRemove);
            }
        })
        $('.modal').hide();
    })
}

function removeCoinFromList(coinId){
    let oldList = getCoinList();
    let idIndex = oldList.indexOf(coinId);
    if (idIndex !== -1){
        oldList.splice(idIndex,1);
        updateCoinList(oldList);
        let item = $(`#actutalTable`).find(`#${coinId}`).find('input');
        $(item).prop("checked", false);
    }
}


function getCoinList(){
    let list = JSON.parse(localStorage.coins_list);
    console.log(`list function: ${list}`);
    return list;
}

function updateCoinList(updated_list){
    localStorage.coins_list = JSON.stringify(updated_list);
    console.log("list updated");
}

function searchFunction(searchInput){
    $('.col').each(function () {
        if (searchInput === ""){
            $(this).show();
        }
        else if(searchInput !== this.id){
            $(this).hide();
            }
        }
    )
    console.log('search func');
}