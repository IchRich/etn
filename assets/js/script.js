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

  // Обработчики для кнопок брендов
  const brandButtons = document.querySelectorAll('.brand_button');
  brandButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Убираем активный класс у всех кнопок
      brandButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс к нажатой кнопке
      this.classList.add('active');
    });
  });

  // Обработчик для кнопки "Показать еще"
  const showMoreButton = document.querySelector('.btn--dark.center');
  if (showMoreButton) {
    showMoreButton.addEventListener('click', function() {
      // Логика загрузки дополнительных товаров
      console.log('Показать еще товаров');
    });
  }
});