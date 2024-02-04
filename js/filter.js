const mostPopPorducts = document.querySelector(".tab_dacument_n");
const categoryLinks = document.querySelectorAll(".lu .il");

// JSON faylni yuklash
const jsonFile = "./products.json";

// Barcha mahsulotlarni olish va chiqarish
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

// JSON faylni o'qish va mahsulotlarni chiqarish
fetch(jsonFile)
	.then((response) => response.json())
	.then((data) => {
		displayProducts(data);

		// Kategoriya tanlanda mahsulotlarni chiqarish
		categoryLinks.forEach((link) => {
			link.addEventListener('click', (event) => {
				event.preventDefault();

				// Aktiv kategoriya tugmasini tanlagan holatda barcha kategoriya tugmalarini "active" klassidan ozod qilish
				categoryLinks.forEach((categoryLink) => {
					categoryLink.classList.remove('active');
				});

				// Tanlangan tugmaga "active" klassini qo'shish
				link.classList.add('active');

				// Tanlangan kategoriya bo'yicha mahsulotlarni chiqarish
				const selectedCategory = link.getAttribute('data-category');

				// Barcha mahsulotlar uchun tekshirish
				if (selectedCategory === '') {
					displayProducts(data);
				} else {
					// Tanlangan kategoriya bo'yicha filtrlash
					const filteredProducts = data.filter((product) => product.category === selectedCategory);
					displayProducts(filteredProducts);
				}
			});
		});

		// "All" tugmasini tanlash va barcha mahsulotlarni chiqarish
		const allCategoryLink = document.querySelector('.lu .li.active');
		allCategoryLink.addEventListener('click', () => {
			// Aktiv kategoriya tugmasini ozod qilish
			categoryLinks.forEach((categoryLink) => {
				categoryLink.classList.remove('active');
			});
			allCategoryLink.classList.add('active');

			// Barcha mahsulotlar uchun tekshirish
			displayProducts(data);
		});
	});
