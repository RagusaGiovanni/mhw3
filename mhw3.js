
const client_id= "3e5fcc82704046c99b702b96be3ae51b"
const client_secret = "2b5fa673d9614947a7730ec128585d8c"
const token = "";


function onResponse(response){
    console.log('Risposta ricevuta');
    return response.json();
}



function OnError(error){
    console.log('Errore: '+ error)
}




function onSpyJson(json){

    console.log(json);

    let items = json.tracks.items;
    
    let num= Math.floor( Math.random()*(10));
    
    let canzone_name = items[num].name;
    //primo artista di riferimento dell'array
    let artista_name = items[num].artists[0].name;
    

    const div = document.querySelector('.Spotify .result');
    div.innerHTML = '';

    const titolo = document.createElement("h1");
    const contenuto = document.createElement("p");

    titolo.textContent="La Canzone:\n" + canzone_name;
    contenuto.textContent="L'Artista:\n" + artista_name;

    titolo.classList.add("titolo_ris");
    contenuto.classList.add("contenuto_ris");

    div.appendChild(titolo);
    div.appendChild(contenuto);

}


function requestApi(event){

    event.preventDefault();

    const text_in = document.querySelector('.Spotify #input');
    const text_value = encodeURIComponent(text_in.value);

    fetch("https://api.spotify.com/v1/search?q="+text_value+"&type=track",{
        method: 'GET',
            headers:{
                'Authorization' : 'Bearer ' + token,
            }
        }
    ).then(onResponse, OnError).then(onSpyJson);

}



function onTokenJson(json)
{
  console.log("JSON token ricevuto");
  console.log(json);
  token = json.access_token;
}

function onTokenResponse(response) {
  return response.json();
}




function requestToken(event)
{
    fetch("https://accounts.spotify.com/api/token",
    {
        method:"post",
        body: 'grant_type=client_credentials',
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
    ).then(onTokenResponse).then(onTokenJson);
}



//event listener per Spotify
let spy_form = document.querySelector('.Spotify form');

spy_form.addEventListener('submit', requestApi);

//chiamata funzione per la gestione del token
requestToken();