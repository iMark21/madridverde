/**
 * MadridVerde — Client-side i18n helper
 *
 * Reads language from localStorage (key: 'mv_lang') or navigator.language.
 * Swaps all elements with data-i18n="key" attribute.
 * Swaps placeholder text on elements with data-i18n-placeholder="key".
 * Swaps aria-label on elements with data-i18n-aria="key".
 *
 * Default language: 'es' (Spanish — matches SSR output).
 */

import { translations } from './translations.js';

const STORAGE_KEY = 'mv_lang';
const SUPPORTED_LANGS = ['es', 'en'];

/** Get stored language, or detect from browser, defaulting to 'es'. */
export function getLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {
    // localStorage may be unavailable
  }

  // Detect from browser
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(nav)) return nav;

  return 'es';
}

/** Set language and apply translations immediately. */
export function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage may be unavailable
  }
  applyTranslations(lang);
  updateLangToggle(lang);
  document.documentElement.lang = lang;

  // Dispatch event for scripts that need to react (charts, dynamic content)
  window.dispatchEvent(new CustomEvent('mv-lang-change', { detail: { lang } }));
}

/** Get a translated string by key, with optional placeholder replacements. */
export function t(key, replacements) {
  const lang = getLang();
  const dict = translations[lang] || translations.es;
  let str = dict[key] || translations.es[key] || key;

  if (replacements) {
    for (const [k, v] of Object.entries(replacements)) {
      str = str.replace(`{${k}}`, v);
    }
  }

  return str;
}

/** Apply translations to all data-i18n elements on the page. */
function applyTranslations(lang) {
  const dict = translations[lang] || translations.es;
  const fallback = translations.es;

  // Text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key && (dict[key] || fallback[key])) {
      el.textContent = dict[key] || fallback[key];
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && (dict[key] || fallback[key])) {
      el.placeholder = dict[key] || fallback[key];
    }
  });

  // Aria labels
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key && (dict[key] || fallback[key])) {
      el.setAttribute('aria-label', dict[key] || fallback[key]);
    }
  });
}

/** Update the toggle button's active state. */
function updateLangToggle(lang) {
  document.querySelectorAll('.lang-toggle-btn').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('lang-toggle-btn--active');
    } else {
      btn.classList.remove('lang-toggle-btn--active');
    }
  });
}

/** Initialize i18n: apply translations if non-default lang, set up toggle. */
export function initI18n() {
  const lang = getLang();

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Only translate if not default (SSR already has Spanish)
  if (lang !== 'es') {
    applyTranslations(lang);
  }

  // Update toggle active state
  updateLangToggle(lang);
}
