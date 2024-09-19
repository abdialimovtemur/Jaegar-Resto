const navbar = document.querySelector(".navbar");
const url = "https://food-pos-data.vercel.app/";
let path = null;
const cards = document.querySelector(".cards");
let cardsUrl = null;


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
         <div class="flex flex-col bg-[#1F1D2B] rounded-lg items-center text-white gap-3 px-3 py-4">
                    <img src="${item.img}" alt="img">
                    <p class="">${item.title}adfa dfas dfasdfsa</p>
                    <p>${item.price}</p>
                    <p class="text-[#ABBBC2]">${item.text}</p>
                </div>

    `
        )
        .join("");
};


const getCardsData = async () => {
    if (!cardsUrl) return;

    try {
        const res = await fetch(cardsUrl);
        const cardsData = await res.json();
        cardsRender(cardsData);

        console.log(cardsData);
    } catch (error) {
        console.log("Error", error);
    }
};


const getData = async () => {
    try {
        const res = await fetch(`${url}catalog`);
        const data = await res.json();
        navRender(data);

        console.log(data);
    } catch (error) {
        console.log("Error", error);
    }
};
getData();


navbar.addEventListener("click", (e) => {
    const targetElement = e.target.closest("[data-path]");
    if (targetElement) {
        path = targetElement.dataset.path;
        cardsUrl = `${url}${path}`;
        console.log(cardsUrl);

        getCardsData();
    }
});



