const navbar = document.querySelector(".navbar");
const url = "https://food-pos-data.vercel.app/";
let path = null;
const cards = document.querySelector(".cards");
let cardsUrl = null;
let itemUrl = null;
let id = null


const navRender = (data) => {
    navbar.innerHTML = data
        .map(
            (item) => `
        <div class="text-white" data-path="${item.path}">
           <h1>${item.name}</h1>
        </div>
    `
        )
        .join("");
};


const cardsRender = (cardsData) => {
    cards.innerHTML = cardsData
        .map(
            (item) => `
         <div class="flex flex-col bg-[#1F1D2B] rounded-lg items-center text-white gap-3 px-3 py-4" data-id="${item.id}">
                    <img src="${item.img}" alt="img" data-id="${item.id}">
                    <p data-id="${item.id}">${item.title}adfa dfas dfasdfsa</p>
                    <p data-id="${item.id}">${item.price}</p>
                    <p class="text-[#ABBBC2]" data-id="${item.id}">${item.text}</p>
                </div>

    `
        )
        .join("");

    console.log(cardsData);

};




const getCardsData = async () => {
    // if (!cardsUrl) return;

    try {
        const res = await fetch(cardsUrl);
        const cardsData = await res.json();
        cardsRender(cardsData);

    } catch (error) {
        console.log("Error", error);
    }
};



const getData = async () => {
    try {
        const res = await fetch(`${url}catalog`);
        const data = await res.json();
        navRender(data);

    } catch (error) {
        console.log("Error", error);
    }
};
getData();


const getItem = async () => {
    try {
        const res = await fetch(`${cardsUrl}/${id}`)
        const itemData = await res.json()
        console.log(itemData);


        let items = JSON.parse(localStorage.getItem('items')) || [];

        items.push(itemData);

        localStorage.setItem('items',JSON.stringify(items));

        console.log("Saved to localStorage:", items)

    } catch (error) {
        console.log("error");
    }
}

getItem()




navbar.addEventListener("click", (e) => {
    const targetElement = e.target.closest("[data-path]");
    if (targetElement) {
        path = targetElement.dataset.path;
        cardsUrl = `${url}${path}`;
        itemUrl = `${cards}${id}`

        console.log(itemUrl);
        
        getCardsData();
    }
});



cards.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        id = e.target.dataset.id
        getItem()
    }
})




