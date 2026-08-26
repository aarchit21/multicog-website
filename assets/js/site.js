(() => {
  const normalize = (value) => (value || '').toLowerCase().trim();
  const params = new URLSearchParams(window.location.search);

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
