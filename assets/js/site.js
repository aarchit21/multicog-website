(() => {
  const normalize = (value) => (value || '').toLowerCase().trim();
  const params = new URLSearchParams(window.location.search);

  const moreMenu = document.querySelector('[data-more-menu]');
  const moreToggle = document.querySelector('[data-more-toggle]');
  const morePanel = document.querySelector('[data-more-panel]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  let mobileReturnFocus = false;

  const closeMore = () => {
    if (!moreToggle || !morePanel) return;
    moreToggle.setAttribute('aria-expanded', 'false');
    morePanel.hidden = true;
  };

  const closeMobile = (returnFocus = false) => {
    if (!mobileToggle || !mobilePanel || mobilePanel.hidden) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open navigation');
    mobilePanel.hidden = true;
    document.body.classList.remove('menu-open');
    if (returnFocus || mobileReturnFocus) mobileToggle.focus();
    mobileReturnFocus = false;
  };

  moreToggle?.addEventListener('click', () => {
    const open = moreToggle.getAttribute('aria-expanded') === 'true';
    moreToggle.setAttribute('aria-expanded', String(!open));
    morePanel.hidden = open;
    if (!open) morePanel.querySelector('a')?.focus();
  });

  mobileToggle?.addEventListener('click', () => {
    const open = mobileToggle.getAttribute('aria-expanded') === 'true';
    if (open) {
      mobileReturnFocus = true;
      closeMobile(true);
      return;
    }
    closeMore();
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.setAttribute('aria-label', 'Close navigation');
    mobilePanel.hidden = false;
    document.body.classList.add('menu-open');
    mobilePanel.querySelector('a')?.focus();
  });

  document.addEventListener('click', (event) => {
    if (moreMenu && !moreMenu.contains(event.target)) closeMore();
    if (mobilePanel && !mobilePanel.hidden && !mobilePanel.contains(event.target) && !mobileToggle.contains(event.target)) closeMobile();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (mobilePanel && !mobilePanel.hidden) {
      mobileReturnFocus = true;
      closeMobile(true);
      return;
    }
    if (morePanel && !morePanel.hidden) {
      closeMore();
      moreToggle?.focus();
    }
  });

  mobilePanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMobile()));

  const filters = document.querySelector('[data-publication-filters]');
  if (filters) {
    const items = [...document.querySelectorAll('[data-publication-list] .filterable')];
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
        const matches = (!q || item.dataset.search.includes(q)) && (!year || item.dataset.year === year) && (!venue || item.dataset.venue === venue) && (!area || item.dataset.area.split(' ').includes(area)) && (!author || item.dataset.author.toLowerCase().includes(author));
        item.hidden = !matches;
        if (matches) visible += 1;
      });
      years.forEach((section) => section.hidden = ![...section.querySelectorAll('.filterable')].some((item) => !item.hidden));
      count.textContent = `${visible} publication${visible === 1 ? '' : 's'}`;
      empty.hidden = visible !== 0;
      const next = new URLSearchParams();
      [...filters.elements].forEach((control) => { if (control.name && control.value) next.set(control.name, control.value); });
      history.replaceState(null, '', `${location.pathname}${next.size ? `?${next}` : ''}`);
    };
    filters.addEventListener('input', update);
    filters.addEventListener('change', update);
    update();
    view?.addEventListener('click', () => {
      const visual = document.documentElement.classList.toggle('publication-visual-view');
      view.setAttribute('aria-pressed', String(visual));
      view.textContent = visual ? 'List view' : 'Visual view';
    });
  }

  const siteSearch = document.querySelector('[data-site-search]');
  if (siteSearch) {
    const input = siteSearch.querySelector('[data-site-search-input]');
    const items = [...siteSearch.querySelectorAll('.filterable')];
    const count = siteSearch.querySelector('[data-site-result-count]');
    const empty = siteSearch.querySelector('[data-site-empty]');
    const update = () => {
      const term = normalize(input.value);
      let visible = 0;
      items.forEach((item) => { const show = !term || item.dataset.search.includes(term); item.hidden = !show; if (show) visible += 1; });
      count.textContent = `${visible} result${visible === 1 ? '' : 's'}`;
      empty.hidden = visible !== 0;
    };
    input.addEventListener('input', update);
  }
})();
