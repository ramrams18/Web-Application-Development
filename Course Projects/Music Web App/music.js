// Put your Last.fm API key here
const api_key = "9f781a8f25f99e31a5a3d684b42a798c";

function sendRequest() {

    var artist = encodeURI(document.getElementById("form-input").value);

    const metadataMethod = "artist.getinfo";
    var metadataLink = "proxy.php?method=" + metadataMethod + "&artist=" + artist + "&api_key=" + api_key + "&format=json";
    var metaDataXhr = new XMLHttpRequest();

    var topAlbumMethod = "artist.gettopalbums";
    var topAlbumLink = "proxy.php?method=" + topAlbumMethod + "&artist=" + artist + "&api_key=" + api_key + "&format=json";
    var topAlbumXhr = new XMLHttpRequest();

    var similarArtistMethod = "artist.getsimilar";
    var similarArtistLink = "proxy.php?method=" + similarArtistMethod + "&artist=" + artist + "&api_key=" + api_key + "&format=json";
    var similarArtistXhr = new XMLHttpRequest();

    metaDataXhr.open("GET", metadataLink, true);
    topAlbumXhr.open("GET", topAlbumLink, true);
    similarArtistXhr.open("GET", similarArtistLink, true);

    metaDataXhr.setRequestHeader("Accept", "application/json");
    topAlbumXhr.setRequestHeader("Accept", "application/json");
    similarArtistXhr.setRequestHeader("Accept", "application/json");

    metaDataXhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.artist ? displayMetadata(json.artist) : console.log('no data') ;
        }
    };

    topAlbumXhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.topalbums.album ? displayTopAlbums(json.topalbums.album) : console.log('no data');
        }
    };

    similarArtistXhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            json.similarartists.artist ? displaySimilarArtist(json.similarartists.artist): console.log('no data') ;
        }
    };

    metaDataXhr.send(null);
    topAlbumXhr.send(null);
    similarArtistXhr.send(null);
}

function displayMetadata(artist) {

    document.getElementById("name").innerHTML = artist && artist.name ? artist.name : '';
    document.getElementById("webpage").innerHTML = artist && artist.url ? artist.url : '';
    document.getElementById("webpage").href = artist && artist.url ? artist.url : '';
    document.getElementById("bio").innerHTML = artist && artist.bio.content ? artist.bio.content : '';
    document.getElementById("pic").src = artist && artist.image[2]['#text'] ? artist.image[2]['#text'] : '';

    console.log(artist);
}

function displayTopAlbums(albums) {

    var heading = document.getElementById("top-albums").getElementsByTagName('h2')[0];
    var list = document.getElementById("top-albums").getElementsByTagName('ul')[0];

    heading.innerHTML = albums ?  'Top albums' : '';
    list.innerHTML = "";

    albums.forEach(album => {

        console.log(album);
        var name = "<span>" + album.name + "</span>";
        var img = "<img src = '" + album.image[2]['#text'] + "' />";
        var listItem = "<li>" + name + "<br>" + img + "</li>";
        list.innerHTML += listItem;
    });
}

function displaySimilarArtist(artists) {

    var heading = document.getElementById("similar").getElementsByTagName('h2')[0];
    var list = document.getElementById("similar").getElementsByTagName('ul')[0];

    heading.innerHTML = 'Similar artists';
    list.innerHTML = "";

    artists.forEach(artist => {
        list.innerHTML += "<li>" + artist.name + "</li>"
    });
}
