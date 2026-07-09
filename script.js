/* =========================================================
   SUPPLY POWER GROUP — script.js
   Navbar, animations, simulateur interactif, formulaire
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar burger (mobile) ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  /* ---------- Navbar shrink/blur on scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navbar.style.boxShadow = '0 8px 30px rgba(0,0,0,0.35)';
    else navbar.style.boxShadow = 'none';
  });

  /* ---------- Animated stat counters ---------- */
  const statEls = document.querySelectorAll('.stat__value');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statEls.forEach(el => statObserver.observe(el));

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll('.card, .mining__grid, .simulator__box, .profile-card, .contact-form');
  revealTargets.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
  });
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* =========================================================
     SIMULATEUR DE CONFIGURATION ÉNERGÉTIQUE
     ========================================================= */

  const equipSelect   = document.getElementById('equipSelect');
  const powerRange     = document.getElementById('powerRange');
  const powerValue     = document.getElementById('powerValue');
  const locationSelect = document.getElementById('locationSelect');
  const resultLoader   = document.getElementById('resultLoader');
  const resultContent  = document.getElementById('resultContent');
  const resultTitle    = document.getElementById('resultTitle');
  const resultDesc     = document.getElementById('resultDesc');
  const resultSpecs    = document.getElementById('resultSpecs');
  const simulatorCta   = document.getElementById('simulatorCta');

  const state = {
    equip: 'cabine',
    power: 250,
    location: 'Kinshasa'
  };

  const EQUIP_LABELS = {
    cabine: 'Cabine HT/BT',
    groupe: 'Groupe Électrogène',
    solaire: 'Solaire Hybride'
  };

  /* --- Recommandation logic --- */
  function getRecommendation(equip, power, location) {
    let title = '';
    let desc = '';

    if (equip === 'cabine') {
      if (power <= 630) {
        title = 'Poste de Transformation Compact Préfabriqué';
        desc = `Pour une puissance de <strong>${power} kVA</strong> à <strong>${location}</strong>, nous recommandons un poste compact préfabriqué : installation rapide, encombrement réduit et sécurité optimale pour vos locaux industriels ou tertiaires.`;
      } else if (power <= 1250) {
        title = 'Cabine Haute Tension Maçonnée Modulaire';
        desc = `À <strong>${power} kVA</strong>, une cabine HT maçonnée modulaire s'impose pour sécuriser la transformation et la distribution sur votre site de <strong>${location}</strong>, avec une capacité d'extension future.`;
      } else {
        title = 'Sous-Station HT/BT Industrielle sur Mesure';
        desc = `Une puissance de <strong>${power} kVA</strong> nécessite une sous-station industrielle sur mesure, conçue pour alimenter des installations lourdes à <strong>${location}</strong> avec redondance et supervision.`;
      }
    } else if (equip === 'groupe') {
      if (power <= 250) {
        title = 'Groupe Électrogène Insonorisé Compact';
        desc = `Pour <strong>${power} kVA</strong> à <strong>${location}</strong>, un groupe électrogène insonorisé compact assure une alimentation de secours fiable et silencieuse pour vos bâtiments et bureaux.`;
      } else if (power <= 1000) {
        title = 'Centrale Électrogène Containerisée';
        desc = `À <strong>${power} kVA</strong>, une centrale électrogène containerisée offre une production robuste et mobile, idéale pour sécuriser l'activité continue de votre site à <strong>${location}</strong>.`;
      } else {
        title = 'Centrale de Production Thermique Multi-Groupes';
        desc = `Pour <strong>${power} kVA</strong>, une centrale thermique multi-groupes en cascade garantit une production continue et redondante pour les besoins industriels lourds de <strong>${location}</strong>.`;
      }
    } else {
      if (power <= 250) {
        title = 'Kit Solaire Hybride Autonome avec Stockage';
        desc = `Pour <strong>${power} kVA</strong> à <strong>${location}</strong>, un kit solaire hybride avec batteries offre une autonomie renforcée et une réduction immédiate de votre facture énergétique.`;
      } else if (power <= 1000) {
        title = 'Centrale Solaire Hybride avec Batteries Lithium';
        desc = `À <strong>${power} kVA</strong>, une centrale solaire hybride couplée à un stockage lithium optimise le mix production/consommation pour votre site de <strong>${location}</strong>.`;
      } else {
        title = 'Ferme Solaire Hybride Industrielle Haute Capacité';
        desc = `Pour <strong>${power} kVA</strong>, une ferme solaire hybride industrielle couplée à des groupes d'appoint sécurise une alimentation continue et durable à <strong>${location}</strong>.`;
      }
    }

    if (location === 'Site minier isolé') {
      desc += ` Une architecture hybride avec stockage est intégrée afin de garantir la continuité d'exploitation en site isolé.`;
    }

    return { title, desc };
  }

  let loadingTimeout = null;

  function updateSimulator() {
    // Show loader
    resultLoader.classList.add('is-active');
    resultContent.classList.add('is-fading');

    if (loadingTimeout) clearTimeout(loadingTimeout);
    loadingTimeout = setTimeout(() => {
      const { title, desc } = getRecommendation(state.equip, state.power, state.location);

      resultTitle.textContent = title;
      resultDesc.innerHTML = desc;
      resultSpecs.innerHTML = `
        <li><span>Puissance</span><strong>${state.power} kVA</strong></li>
        <li><span>Équipement</span><strong>${EQUIP_LABELS[state.equip]}</strong></li>
        <li><span>Zone</span><strong>${state.location}</strong></li>
      `;

      resultLoader.classList.remove('is-active');
      resultContent.classList.remove('is-fading');
    }, 650);
  }

  // Equipment selection
  if (equipSelect) {
    equipSelect.querySelectorAll('.equip-option').forEach(btn => {
      btn.addEventListener('click', () => {
        equipSelect.querySelectorAll('.equip-option').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        state.equip = btn.dataset.equip;
        updateSimulator();
      });
    });
  }

  // Power slider
  if (powerRange) {
    powerRange.addEventListener('input', () => {
      state.power = parseInt(powerRange.value, 10);
      powerValue.textContent = state.power;
    });
    powerRange.addEventListener('change', updateSimulator);
    // Live update while dragging too, but debounced
    let dragTimeout = null;
    powerRange.addEventListener('input', () => {
      if (dragTimeout) clearTimeout(dragTimeout);
      dragTimeout = setTimeout(updateSimulator, 400);
    });
  }

  // Location select
  if (locationSelect) {
    locationSelect.addEventListener('change', () => {
      state.location = locationSelect.value;
      updateSimulator();
    });
  }

  // CTA scroll pre-fill of description
  if (simulatorCta) {
    simulatorCta.addEventListener('click', () => {
      const description = document.getElementById('description');
      if (description && !description.value) {
        description.value = `Bonjour, je souhaite une étude pour : ${EQUIP_LABELS[state.equip]} — ${state.power} kVA — Localisation : ${state.location}.`;
      }
    });
  }

  /* =========================================================
     FORMULAIRE DE CONTACT
     ========================================================= */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const phoneInput = document.getElementById('phone');

  // Keep +243 prefix intact
  if (phoneInput) {
    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value.trim()) phoneInput.value = '+243 ';
    });
    phoneInput.addEventListener('input', () => {
      if (!phoneInput.value.startsWith('+243')) {
        phoneInput.value = '+243 ' + phoneInput.value.replace(/^\+?243\s?/, '');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formSuccess.classList.add('is-visible');
      contactForm.reset();
      if (phoneInput) phoneInput.value = '+243 ';

      setTimeout(() => {
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    });
  }

});
