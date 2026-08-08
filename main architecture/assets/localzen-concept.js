(() => {
  document.querySelectorAll('[data-embed-launch]').forEach((button) => {
    button.addEventListener('click', () => {
      const shell = button.closest('[data-embed-shell]');
      const frame = shell?.querySelector('iframe[data-src]');
      if (!shell || !frame || !frame.dataset.src) return;

      frame.src = frame.dataset.src;
      shell.classList.add('is-loaded');
      button.setAttribute('aria-expanded', 'true');
    }, { once: true });
  });

  const groups = [...document.querySelectorAll('.lzc-feature-group')];
  groups.forEach((group) => {
    group.addEventListener('toggle', () => {
      if (!group.open) return;
      groups.forEach((other) => {
        if (other !== group) other.open = false;
      });
    });
  });
})();
