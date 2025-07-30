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