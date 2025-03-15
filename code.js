document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
    }, 2000);

    // Получаем все элементы с классом product-card
    const productCards = document.querySelectorAll('.product-card');
    const popups = document.querySelectorAll('.popup');
    
    // Добавляем обработчик для каждой карточки товара
    productCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const popup = document.getElementById(`popup_${index + 1}`);
            if (popup) {
                popup.classList.add('open');
            }
        });
    });

    // Добавляем обработчики для закрытия popup
    document.querySelectorAll('.close-popup').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.popup').classList.remove('open');
        });
    });

    // Закрытие при клике вне контента popup
    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('open');
            }
        });
    });

    // Обработчик для кнопок "Добавить в корзину"
    document.querySelectorAll('.popup-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Товар добавлен в корзину!');
        });
    });
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