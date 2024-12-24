const RPR = {};
RPR.pjData = [];
RPR.loadPj = async (pjName) => {
    const response = await fetch(`pjs/${pjName}.json`);
    const data = await response.text();
    RPR.pjData.push(JSON.parse(data));

    return RPR.pjData;
};

RPR.loadDataFromPj = (id) => {
    document.querySelector('.character__info').innerHTML = `id: ${RPR.pjData[id].id}, Name: ${RPR.pjData[id].name}, Description: ${RPR.pjData[id].description}`;
};

const pjlist = ['pjdemo'];

//for testing data loading
setTimeout(() => {
    pjlist.map((pj)=>{
        RPR.loadPj(pj);
    })
    setTimeout(() => {
        let cards = '';
        pjlist.map((pj,i)=>{
            console.log(i,RPR.pjData[i]);
            cards += `<div class="character__card" id="${RPR.pjData[i].id}">`;
            cards += `<span class="character__name">${RPR.pjData[i].name}</span>`;
            cards += `<img src="pjs/${RPR.pjData[i].img}" alt="${RPR.pjData[i].name}">`;
            cards += `<span class="character__description">${RPR.pjData[i].description}</span>`;
            cards += '</div>';
            document.querySelector('.character__container').innerHTML = cards;
            document.querySelectorAll('.character__card')[i].addEventListener('click', (e) => {
                //actions on character click
            });
        })
    }, 250);
}, 200);
