document.querySelectorAll('.faq_button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq_item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq_item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq_button').classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('open');
        button.classList.add('active');
      }
    });
  });

  let lastScrollY = window.scrollY;
let ticking = false;
const header = document.querySelector('.header');

function updateHeader() {
  const currentScrollY = window.scrollY;
  
  // Определяем направление скролла
  const scrollingDown = currentScrollY > lastScrollY;
  
  // Добавляем фон при скролле не в самом верху
  if (currentScrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Скрываем хедер при скролле вниз
  if (scrollingDown && currentScrollY > 100) {
    header.classList.add('hidden');
  } 
  // Показываем хедер при скролле вверх
  else if (!scrollingDown && currentScrollY > 0) {
    header.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
});
// Функциональность для фильтров в каталоге
document.addEventListener('DOMContentLoaded', function() {
  // Обработчики для заголовков фильтров
  const filterTitles = document.querySelectorAll('.filter_title');
  
  filterTitles.forEach(title => {
    title.addEventListener('click', function() {
      const filterSection = this.closest('.filter_section');
      filterSection.classList.toggle('collapsed');
    });
  });

  // Обработчики для чекбоксов фильтров
  const filterCheckboxes = document.querySelectorAll('.filter_checkbox input[type="checkbox"]');
  
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      // Здесь можно добавить логику фильтрации
      console.log('Фильтр изменен:', this.closest('.filter_checkbox').textContent.trim());
    });
  });

  // Обработчики для кнопок фильтров
  const applyButton = document.querySelector('.filter_buttons .btn--primary');
  const resetButton = document.querySelector('.filter_buttons .btn--reset');
  
  if (applyButton) {
    applyButton.addEventListener('click', function() {
      // Логика применения фильтров
      console.log('Применить фильтры');
    });
  }
  
  if (resetButton) {
    resetButton.addEventListener('click', function() {
      // Сброс всех чекбоксов
      filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      
      // Сброс полей ввода цены
      const priceInputs = document.querySelectorAll('.price_input');
      priceInputs.forEach(input => {
        input.value = '';
      });
      
      console.log('Сбросить фильтры');
    });
  }

  // Переключение вида каталога (плитка/список)
  const gridContainer = document.querySelector('.carts_grid');
  const gridBtn = document.querySelector('.grid_button--grid');
  const listBtn = document.querySelector('.grid_button--list');

  function setView(mode) {
    if (!gridContainer) return;
    if (mode === 'grid') {
      gridContainer.classList.remove('carts_grid--list');
      gridContainer.classList.add('carts_grid--grid');
      if (gridBtn) {
        gridBtn.classList.add('active');
        gridBtn.setAttribute('aria-pressed', 'true');
      }
      if (listBtn) {
        listBtn.classList.remove('active');
        listBtn.setAttribute('aria-pressed', 'false');
      }
    } else if (mode === 'list') {
      gridContainer.classList.remove('carts_grid--grid');
      gridContainer.classList.add('carts_grid--list');
      if (listBtn) {
        listBtn.classList.add('active');
        listBtn.setAttribute('aria-pressed', 'true');
      }
      if (gridBtn) {
        gridBtn.classList.remove('active');
        gridBtn.setAttribute('aria-pressed', 'false');
      }
    }
  }

  // Инициализация: по умолчанию плитка
  setView('grid');

  if (gridBtn) gridBtn.addEventListener('click', () => setView('grid'));
  if (listBtn) listBtn.addEventListener('click', () => setView('list'));

  // Блок кнопок брендов удален на странице каталога — соответствующие обработчики тоже удалены

  // Обработчик для кнопки "Показать еще"
  const showMoreButton = document.querySelector('.btn--dark.center');
  if (showMoreButton) {
    showMoreButton.addEventListener('click', function() {
      // Логика загрузки дополнительных товаров
      console.log('Показать еще товаров');
    });
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Элементы
  const cartIcon = document.querySelector('a[href="cart.html"]');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartModal = document.getElementById('cartModal');
  const cartClose = document.querySelector('.cart-close');
  
  // Открытие корзины
  cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    cartOverlay.style.display = 'block';
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
  });
  
  // Закрытие корзины
  function closeCart() {
    cartOverlay.style.display = 'none';
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Очистка корзины
  const cartClear = document.querySelector('.cart-clear');
  if (cartClear) {
    cartClear.addEventListener('click', function(e) {
      e.preventDefault();
      const cartItems = document.querySelectorAll('.cart-item');
      cartItems.forEach(item => item.remove());
      updateTotal();
    });
  }
  
  cartOverlay.addEventListener('click', closeCart);
  cartClose.addEventListener('click', closeCart);
  
  // Управление количеством
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const isPlus = this.classList.contains('plus');
      const quantityEl = this.parentElement.querySelector('span');
      let quantity = parseInt(quantityEl.textContent);
      
      if (isPlus) {
        quantity++;
      } else if (quantity > 1) {
        quantity--;
      }
      
      quantityEl.textContent = quantity;
      updateTotal();
    });
  });
  
  // Удаление товара
  document.querySelectorAll('.item-remove').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.cart-item').remove();
      updateTotal();
    });
  });
  
  // Обновление итогов
  function updateTotal() {
    // Здесь будет логика расчета суммы
    // Для WP это будет интегрировано с WooCommerce
    console.log('Обновление суммы заказа');
  }
  
  // Обработка формы
  document.querySelector('.cart-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Здесь будет отправка формы
    alert('Заказ оформлен! В реальной системе это будет интегрировано с WooCommerce');
    closeCart();
  });
});

// Автодополнение поиска на главной странице
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('mainSearchInput');
  const autocomplete = document.getElementById('searchAutocomplete');
  const searchOverlay = document.getElementById('searchOverlay');
  const overlayMask = document.getElementById('overlayMask');
  
  if (!searchInput || !autocomplete) return;
  
  // Моковые данные для демонстрации
  const mockProducts = [
    {
      id: 1,
      title: 'Долбяк дисковый М0,6 Z=108 В Р18 20гр dпос=31,75мм',
      articul: 'ART-001',
      image: 'assets/img/dolbnaylkDisk.jpg',
      priceWithVAT: '5 988',
      priceWithoutVAT: '4 990',
      availability: 'В наличии'
    },
    {
      id: 2,
      title: 'Фреза концевая D=12 L=75 L1=25 Z=4 В Р18',
      articul: 'ART-002',
      image: 'assets/img/diamond.png',
      priceWithVAT: '3 245',
      priceWithoutVAT: '2 704',
      availability: 'В наличии'
    },
    {
      id: 3,
      title: 'Сверло спиральное D=8 L=120 L1=35 В Р18',
      articul: 'ART-003',
      image: 'assets/img/diamond.png',
      priceWithVAT: '1 890',
      priceWithoutVAT: '1 575',
      availability: 'В наличии'
    }
  ];
  
  function createAutocompleteItem(product) {
    return `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-card_image">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-card_info">
          <div class="info_title">
            <h3 class="product-card_title">${product.title}</h3>
            <p class="product_articul">${product.articul}</p>
          </div>
          <div class="info_prices">
            <p class="product-card_price">Цена с НДС <b>${product.priceWithVAT} рублей</b></p>
            <p class="product-card_price-alt">Цена без НДС <b>${product.priceWithoutVAT} рублей</b></p>
          </div>
          <p class="product-card_availability">${product.availability}</p>
          <div class="product-card_actions">
            <div class="product-card_qty">
              <button class="quantity-btn minus">-</button>
              <span>1</span>
              <button class="quantity-btn plus">+</button>
            </div>
            <button class="btn btn--yellow">Добавить в корзину</button>
          </div>
        </div>
      </div>
    `;
  }
  
  function showAutocomplete(results) {
    if (results.length === 0) {
      autocomplete.style.display = 'none';
      searchOverlay.style.display = 'none';
      return;
    }
    
    const resultsContainer = autocomplete.querySelector('.autocomplete_results');
    resultsContainer.innerHTML = results.map(createAutocompleteItem).join('');
    
    autocomplete.style.display = 'block';
    searchOverlay.style.display = 'none'; // верх не затемняем
    if (overlayMask) {
      const searchRect = searchInput.closest('.catalog_search').getBoundingClientRect();
      overlayMask.style.top = `${searchRect.bottom}px`;
      overlayMask.style.height = `calc(100vh - ${searchRect.bottom}px)`;
      overlayMask.style.display = 'block';
    }
    
    // Добавляем обработчики для кнопок количества
    autocomplete.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isPlus = this.classList.contains('plus');
        const quantityEl = this.parentElement.querySelector('span');
        let quantity = parseInt(quantityEl.textContent);
        
        if (isPlus) {
          quantity++;
        } else if (quantity > 1) {
          quantity--;
        }
        
        quantityEl.textContent = quantity;
      });
    });
    
    // Добавляем обработчики для кнопок "Добавить в корзину"
    autocomplete.querySelectorAll('.product-card .btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const productId = this.closest('.autocomplete_item').dataset.productId;
        console.log('Добавлен в корзину товар с ID:', productId);
        // Здесь будет логика добавления в корзину
        hideAutocomplete();
      });
    });
  }
  
  function hideAutocomplete() {
    autocomplete.style.display = 'none';
    searchOverlay.style.display = 'none';
    if (overlayMask) overlayMask.style.display = 'none';
  }
  
  function searchProducts(query) {
    if (query.length < 2) {
      hideAutocomplete();
      return;
    }
    
    // Фильтрация товаров по запросу
    const results = mockProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.articul.toLowerCase().includes(query.toLowerCase())
    );
    
    showAutocomplete(results);
  }
  
  // Обработчик ввода в поисковое поле
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchProducts(this.value);
    }, 300);
  });

  // Показ автодополнения при фокусе, если уже есть символы
  searchInput.addEventListener('focus', function() {
    if (this.value && this.value.trim().length >= 2) {
      searchProducts(this.value.trim());
    }
  });
  
  // Скрытие автодополнения при клике вне его (кроме поля ввода)
  searchOverlay.addEventListener('click', hideAutocomplete);
  if (overlayMask) overlayMask.addEventListener('click', hideAutocomplete);
  document.addEventListener('mousedown', function(e) {
    const withinAutocomplete = autocomplete.contains(e.target);
    const withinInput = searchInput.contains(e.target);
    if (!withinAutocomplete && !withinInput) hideAutocomplete();
  });
  
  // Скрытие при нажатии Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideAutocomplete();
    }
  });
  
  // Убираем авто-скрытие на blur (оставляем только правила клика/скролла)

  // Скрывать выпадающий список при скролле страницы
  window.addEventListener('scroll', hideAutocomplete, { passive: true });
});