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