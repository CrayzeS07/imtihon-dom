const img_2 = document.querySelector('.img_2');
const korzinka_tavar = document.querySelector('.korzinka_tavar')
const korzinka_mahsulotlar = document.querySelector('.korzinka_mahsulotlar');
const tavar_sotish = document.querySelector('.tavar_sotish');
img_2.addEventListener("click", () => {
    korzinka_mahsulotlar.classList.add("korzinPC")
    tavar_sotish.classList.add("none");
})
korzinka_tavar.addEventListener("click", () => {
    korzinka_mahsulotlar.classList.add("korzinPC")
    tavar_sotish.classList.add("none");

})
//search
const searchData = 'https://fakestoreapi.com/products';

const input = document.querySelector(".search_1");
const searchDataContainer = document.querySelector(".search_data");

input.addEventListener("input", async () => {
    const resultMessage = document.createElement('div');

    try {
        const response = await fetch(searchData);
        const data = await response.json();

        const filteredData = data.filter(item =>
            item.title.toLowerCase().includes(input.value.toLowerCase())
        );
   resultMessage.innerHTML = filteredData.map(item => `
            <div class="img_prise_1">
                 <img class="img_prise" src="${(item.image)}" alt="">
                <h1 class="text_prise">ID:${item.id}  $${item.price}</h1>
            </div>`
        ).join('');
     
    } catch (error) {
        console.error('Fetch error:', error);
        resultMessage.innerHTML = '<p>Error fetching data</p>';
    }

    searchDataContainer.innerHTML = '';
    searchDataContainer.appendChild(resultMessage);
});


//tab
const mostPopPorducts = document.querySelector(".most-popular-products");
const categoryLinks = document.querySelectorAll("lu il1");

const jsonFile = "./js/products.json";

function displayProducts(products) {
    mostPopPorducts.innerHTML = "";
    products.map((product) => {
        const { id, title, price, image, category } = product;
        mostPopPorducts.innerHTML += `
            <div class="product-card" data-product-id="${id}" data-category="${category}">
                <div class="product-card__container">
                    <div class="product-card__btn cart" data-tooltip="add to cart"><span class="material-symbols-rounded"> shopping_bag </span></div>
                    <div class="product-card__btn fav" data-tooltip="add to wishlist"><span class="material-symbols-rounded"> favorite </span></div>
                    <div class="product-card__img">
                        <img src="${image}" alt="${name}" />
                    </div>
                </div>
                <div class="product-card__description">
                    <div class="product-card__text">${title}</div>
                    <div class="product-card__price">${price}</div>
                </div>
            </div>`;
    });
}

fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
        displayProducts(data);

        categoryLinks.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
		
				categoryLinks.forEach((categoryLink) => {
					categoryLink.classList.remove('active');
				});
		
				link.classList.add('active');
		
				const selectedCategory = link.getAttribute('data-category');
		
				if (selectedCategory === '') {
					displayProducts(data);
				} else {
					const filteredProducts = data.filter((product) => product.category === selectedCategory);
					displayProducts(filteredProducts);
				}
			});
		});
		
		const allCategoryLink = document.querySelector('lu il1.active');
		allCategoryLink.addEventListener('click', () => {
			categoryLinks.forEach((categoryLink) => {
				categoryLink.classList.remove('active');
			});
			allCategoryLink.classList.add('active');
		
			displayProducts(data);
		});
    });
