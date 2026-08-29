(() => {
  const normalize = (value) => (value || '').toLowerCase().trim();
  const params = new URLSearchParams(window.location.search);

  const moreMenu = document.querySelector('[data-more-menu]');
  const moreToggle = document.querySelector('[data-more-toggle]');
  const morePanel = document.querySelector('[data-more-panel]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  const mobileDrawer = document.querySelector('[data-mobile-drawer]');
  const mobileClose = document.querySelector('[data-mobile-close]');
  const mobileBackdrop = document.querySelector('[data-mobile-backdrop]');
  const mobileBreakpoint = window.matchMedia('(max-width: 1050px)');
  const themeToggles = [...document.querySelectorAll('[data-theme-toggle]')];
  const themeStorageKey = 'multicog-theme';

  const getTheme = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const setTheme = (theme, persist = false) => {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    themeToggles.forEach((toggle) => {
      const label = nextTheme === 'dark' ? 'Activate light theme' : 'Activate dark theme';
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    });
    if (persist) {
      try {
        localStorage.setItem(themeStorageKey, nextTheme);
      } catch (_) {
        // A blocked storage area should not prevent theme switching.
      }
    }
  };

  setTheme(getTheme());
  themeToggles.forEach((toggle) => toggle.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark', true);
  }));

  const closeMore = (returnFocus = false) => {
    if (!moreToggle || !morePanel) return;
    const wasOpen = moreToggle.getAttribute('aria-expanded') === 'true';
    moreToggle.setAttribute('aria-expanded', 'false');
    morePanel.hidden = true;
    if (returnFocus && wasOpen) moreToggle.focus();
  };

  const mobileIsOpen = () => mobilePanel?.dataset.state === 'open';

  const setMobileState = (open, returnFocus = false) => {
    if (!mobileToggle || !mobilePanel || !mobileDrawer) return;
    const wasOpen = mobileIsOpen();
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileToggle.dataset.state = open ? 'open' : 'closed';
    mobilePanel.dataset.state = open ? 'open' : 'closed';
    mobilePanel.setAttribute('aria-hidden', String(!open));
    mobilePanel.toggleAttribute('inert', !open);
    mobileDrawer.dataset.state = open ? 'open' : 'closed';
    document.documentElement.classList.toggle('overflow-hidden', open);
    document.body.classList.toggle('overflow-hidden', open);
    if (open) {
      window.requestAnimationFrame(() => mobileClose?.focus());
    } else if (returnFocus && wasOpen) {
      mobileToggle.focus();
    }
  };

  const closeMobile = (returnFocus = false) => setMobileState(false, returnFocus);
  const openMobile = () => {
    if (!mobileBreakpoint.matches) return;
    closeMore();
    setMobileState(true);
  };

  moreToggle?.addEventListener('click', () => {
    const open = moreToggle.getAttribute('aria-expanded') === 'true';
    moreToggle.setAttribute('aria-expanded', String(!open));
    morePanel.hidden = open;
    if (!open) morePanel.querySelector('a')?.focus();
  });

  mobileToggle?.addEventListener('click', () => {
    if (mobileIsOpen()) closeMobile(true);
    else openMobile();
  });
  mobileClose?.addEventListener('click', () => closeMobile(true));
  mobileBackdrop?.addEventListener('click', () => closeMobile(true));

  document.addEventListener('click', (event) => {
    if (moreMenu && !moreMenu.contains(event.target)) closeMore();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && mobileIsOpen()) {
      const focusable = [...mobilePanel.querySelectorAll('a[href], button:not([disabled])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key !== 'Escape') return;
    if (mobileIsOpen()) {
      closeMobile(true);
      return;
    }
    if (morePanel && !morePanel.hidden) closeMore(true);
  });

  mobilePanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMobile()));
  mobileBreakpoint.addEventListener('change', (event) => {
    if (!event.matches) closeMobile();
  });

  const filters = document.querySelector('[data-publication-filters]');
  if (filters) {
    const publications = document.querySelector('[data-publications]');
    const items = [...document.querySelectorAll('[data-publication-list] [data-filterable]')];
    const years = [...document.querySelectorAll('[data-publication-year]')];
    const count = document.querySelector('[data-result-count]');
    const empty = document.querySelector('[data-empty-state]');
    const view = document.querySelector('[data-view-toggle]');

    [...filters.elements].forEach((control) => {
      if (control.name && params.has(control.name)) control.value = params.get(control.name);
    });

    const update = () => {
      const form = new FormData(filters);
      const q = normalize(form.get('q'));
      const year = form.get('year');
      const venue = form.get('venue');
      const area = form.get('area');
      const author = normalize(form.get('author'));
      let visible = 0;
      items.forEach((item) => {
        const matches = (!q || item.dataset.search.includes(q))
          && (!year || item.dataset.year === year)
          && (!venue || item.dataset.venue === venue)
          && (!area || item.dataset.area.split(' ').includes(area))
          && (!author || normalize(item.dataset.author).includes(author));
        item.hidden = !matches;
        if (matches) visible += 1;
      });
      years.forEach((section) => {
        section.hidden = ![...section.querySelectorAll('[data-filterable]')].some((item) => !item.hidden);
      });
      count.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
      empty.hidden = visible !== 0;
      const next = new URLSearchParams();
      [...filters.elements].forEach((control) => {
        if (control.name && control.value) next.set(control.name, control.value);
      });
      history.replaceState(null, '', `${location.pathname}${next.size ? `?${next}` : ''}`);
    };

    filters.addEventListener('input', update);
    filters.addEventListener('change', update);
    update();
    view?.addEventListener('click', () => {
      const visual = publications.dataset.view !== 'visual';
      publications.dataset.view = visual ? 'visual' : 'list';
      view.setAttribute('aria-pressed', String(visual));
      view.textContent = visual ? 'List view' : 'Visual view';
    });
  }

  const siteSearch = document.querySelector('[data-site-search]');
  if (siteSearch) {
    const input = siteSearch.querySelector('[data-site-search-input]');
    const items = [...siteSearch.querySelectorAll('[data-filterable]')];
    const count = siteSearch.querySelector('[data-site-result-count]');
    const empty = siteSearch.querySelector('[data-site-empty]');
    if (params.has('q')) input.value = params.get('q');
    const update = () => {
      const term = normalize(input.value);
      let visible = 0;
      items.forEach((item) => {
        const show = !term || item.dataset.search.includes(term);
        item.hidden = !show;
        if (show) visible += 1;
      });
      count.textContent = `${visible} result${visible === 1 ? '' : 's'}`;
      empty.hidden = visible !== 0;
      const next = new URLSearchParams();
      if (input.value.trim()) next.set('q', input.value.trim());
      history.replaceState(null, '', `${location.pathname}${next.size ? `?${next}` : ''}`);
    };
    input.addEventListener('input', update);
    update();
  }
})();
