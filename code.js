document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 2000);
});


// Получаем элементы модального окна
const modal = document.getElementById("modal");
const modalImg = document.querySelector(".modal-img");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalPrice = document.querySelector(".modal-price");
const closeModal = document.querySelector(".close");

// Получаем все кнопки "Подробнее"
const openModalBtns = document.querySelectorAll(".open-modal-btn");

// Добавляем событие клика на каждую кнопку
openModalBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        // Получаем данные из карточки товара
        const productCard = this.closest(".product-card");
        const name = productCard.getAttribute("data-name");
        const description = productCard.getAttribute("data-description");
        const price = productCard.getAttribute("data-price");
        const img = productCard.getAttribute("data-img");

        // Устанавливаем данные в модальное окно
        modalImg.src = img;
        modalTitle.textContent = name;
        modalDescription.textContent = description;
        modalPrice.textContent = `Цена: ${price}`;

        // Показываем модальное окно
        modal.style.display = "flex";
    });
});