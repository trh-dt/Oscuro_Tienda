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

// Функция для скрытия прелоадера
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        content.style.display = 'block';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Функция для открытия модального окна
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Функция для закрытия модального окна
function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    popup.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Добавляем обработчики для всех кнопок закрытия
document.querySelectorAll('.close-popup').forEach(button => {
    button.addEventListener('click', function() {
        const popup = this.closest('.popup');
        closePopup(popup.id);
    });
});

// Закрытие модального окна при клике вне его области
document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            closePopup(this.id);
        }
    });
});

// Функция для фильтрации товаров
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

// Добавляем фильтры в начало таблицы товаров
const productTable = document.querySelector('.product_table');
const filterContainer = document.createElement('div');
filterContainer.className = 'filter-container';
filterContainer.innerHTML = `
    <div class="filters">
        <button class="filter-btn active" data-category="all">Все</button>
        <button class="filter-btn" data-category="hoodies">Худи</button>
        <button class="filter-btn" data-category="tshirts">Футболки</button>
        <button class="filter-btn" data-category="cases">Чехлы</button>
    </div>
`;
productTable.insertBefore(filterContainer, productTable.firstChild);

// Добавляем обработчики для фильтров
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Убираем активный класс у всех кнопок
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        // Фильтруем товары
        filterProducts(this.dataset.category);
    });
});

// Добавляем анимацию при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Добавляем функционал корзины
let cart = [];

function addToCart(productId, productName, price) {
    cart.push({ id: productId, name: productName, price: price });
    updateCartCount();
    showNotification('Товар добавлен в корзину');
}

function updateCartCount() {
    const cartCount = document.createElement('div');
    cartCount.className = 'cart-count';
    cartCount.textContent = cart.length;
    
    const existingCount = document.querySelector('.cart-count');
    if (existingCount) {
        existingCount.remove();
    }
    
    const cartButton = document.querySelector('.cart-btn');
    if (cartButton) {
        cartButton.appendChild(cartCount);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Добавляем стили для новых элементов
const style = document.createElement('style');
style.textContent = `
    .filter-container {
        width: 100%;
        padding: 20px;
        text-align: center;
    }
    
    .filters {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .filter-btn {
        padding: 8px 16px;
        border: 2px solid #000;
        border-radius: 20px;
        background: none;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn.active {
        background: #000;
        color: #fff;
    }
    
    .filter-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 15px 25px;
        border-radius: 5px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff0000;
        color: #fff;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
    
    .product-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }
    
    .product-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);