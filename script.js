function render(){
    let bundeslandCards = document.getElementById('cards');
    bundeslandCards.innerHTML = '';

    for (let i = 0; i < bundeslaender.length; i++) {
        const bundesland = bundeslaender[i];
        bundeslandCards.innerHTML += generateBundeslandHtml(bundesland, i);


        let industriesUl = document.getElementById(`industries-list${i}`);
        industriesUl.innerHTML = '';     
        for (let j = 0; j < bundesland["Industries"].length; j++) {
            const industrie = bundesland["Industries"][j];
                
            industriesUl.innerHTML += /*html*/`
            <li>${industrie}</li>
            `;
        }


        let commentSection = document.getElementById(`comments-ul-${i}`);
        commentSection.innerHTML = '';
        for (let p = 0; p < bundesland["comments"].length; p++) {
            let comment = bundesland["comments"][p];

            commentSection.innerHTML += /*html*/`
            <li>${comment}</li>
            `;
        }
    }
}

function generateBundeslandHtml(bundesland, i){
    return /*html*/`
            <div class="bundesland-container">
                <header class="card-head">
                    <div class="img-container">
                        <a href="${bundesland["url"]}" target="_blank"><img src="${bundesland["imgCountryFlag"]}" alt="Country Flag"></a>
                        <a href="${bundesland["url"]}" target="_blank"><img src="${bundesland["imgStateCoatOfArms"]}" alt="StateCoatOfArms"></a>
                    </div>
                    <div class="headline-container">
                        <h2>${bundesland["name"]}</h2>
                        <h3>${bundesland["capitalCity"]}</h3>
                    </div>
                </header>
                <main>
                    <p class="mein-p">Einwohner: ${bundesland["population"]}</p>
                    <p class="mein-p">${bundesland["particularities"]}</p>
                    <div id="industries-drdo${i}" class="industrie-dropdown">
                        <a onclick="dropDown(${i})" class="drdo-link">
                            <div><h3>Industrie</h3></div>
                            <div class="arrow-down"><h3 id="industrie-drdo">↓</h3></div>
                        </a>
                    </div>
                    <ul id="industries-list${i}" class="industrie-ul d-none"></ul>
                </main>
                <footer class="comment-container">
                    <div class="input-container">
                        <input  id="new-comment${i}" class="input" type="text" placeholder="Kommentar">
                        <button onclick="addComment(${i})" class="input-btn">Hinzufügen</button>
                    </div>
                    <ul id="comments-ul-${i}" class="comments-ul"></ul>
                </footer>
            </div>
        `;
};

function addComment(newComment){
    let input = document.getElementById(`new-comment${newComment}`).value;
    bundeslaender[newComment]["comments"].push(input);
    input.value = '';
    render();
}

function dropDown(i){
    let index = i;
    let industriedrdo = document.getElementById(`industries-drdo${index}`);
    let industrieList = document.getElementById(`industries-list${index}`);
    // let arrow = document.getElementById('industrie-drdo');

    industriedrdo.classList.add('dropdown-border');
    industriedrdo.innerHTML = '';
    industriedrdo.innerHTML = /*html*/`
    <a onclick="dropDownClose(${i})" class="drdo-link">
        <div><h3>Industrie</h3></div>
        <div class="arrow-down"><p id="industrie-drdo">↑</p></div>
    </a>
    `;
    industrieList.classList.remove('d-none');
}

function dropDownClose(i){
    let index = i;
    let industriedrdo = document.getElementById(`industries-drdo${index}`);
    let industrieList = document.getElementById(`industries-list${index}`);

    industriedrdo.classList.remove('dropdown-border');
    industriedrdo.innerHTML = '';
    industriedrdo.innerHTML = /*html*/`
    <a onclick="dropDown(${i})" class="drdo-link">
        <div><h3>Industrie</h3></div>
        <div class="arrow-down"><p id="industrie-drdo">↓</p></div>
    </a>
    `;
    industrieList.classList.add('d-none');
}