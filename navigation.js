// Progressive enhancement: with JavaScript disabled, all links remain visible.
(() => {
  const header = document.querySelector('.homepage-header');
  const navigation = document.querySelector('.homepage-navigation');
  const toggle = document.querySelector('.homepage-menu-toggle');
  const mobile = window.matchMedia('(max-width: 620px)');

  function updateHeaderHeight() {
    document.documentElement.style.setProperty('--homepage-header-height', `${header.offsetHeight}px`);
  }

  function closeMenu(returnFocus = false) {
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
    updateHeaderHeight();
  }

  function syncNavigation() {
    const focusedLink = navigation.contains(document.activeElement);
    toggle.hidden = !mobile.matches;
    closeMenu(mobile.matches && focusedLink);
  }

  header.classList.add('menu-enabled');
  syncNavigation();
  mobile.addEventListener('change', syncNavigation);
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    updateHeaderHeight();
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  header.querySelector('.homepage-wordmark').addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(header);
})();
