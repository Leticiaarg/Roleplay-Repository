const RPR = {};
RPR.utils = {};
RPR.pjData = [];
RPR.loadPj = async (pjName) => {
    const response = await fetch(`pjs/${pjName}.json`);
    const data = await response.text();
    RPR.pjData.push(JSON.parse(data));

    return RPR.pjData;
};

RPR.utils.drawDataObjectToList = (data) => {
    let listHtml = '<ul>';
    console.log(data);
    Object.entries(data).forEach(([key, value]) => {
        listHtml += `<li>${key}: ${value}</li>`;
    });
    listHtml += '</ul>';
    return listHtml;
}

RPR.loadDataFromPj = (id) => {
    console.log(id, RPR.pjData[id] || 'No data found'  + id);
    pjId = id-1;
    console.log(pjId);
    document.querySelector('.character__data').innerHTML = `
        <span>id: ${RPR.pjData[pjId].id}</span>
        <span>Name: ${RPR.pjData[pjId].name}</span>
        <h2>Description:</h2>
        <span>${RPR.pjData[pjId].description}</span>
        <h2>Atributes:</h2>
        ${RPR.utils.drawDataObjectToList(RPR.pjData[pjId].attributes)}
        <h2>Skills:</h2> ${RPR.utils.drawDataObjectToList(RPR.pjData[pjId].skills)}`;
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
            cards += `
            <div class="character__card" id="${RPR.pjData[i].id}">
                <span class="character__name">${RPR.pjData[i].name}</span>
                <img src="pjs/${RPR.pjData[i].img}" alt="${RPR.pjData[i].name}">
                <span class="character__description">${RPR.pjData[i].description}</span>
            </div>`;
        });
        document.querySelector('.character__container').innerHTML = cards;
        document.querySelectorAll('.character__card').forEach((elem) => {
            elem.addEventListener('click', (e) => {
                RPR.loadDataFromPj(e.target.parentElement.id);
            });
        });
    }, 250);
}, 200);
