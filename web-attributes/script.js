'use strict';

/**
 * Add event listener to multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * Scroll-based reveal animation using IntersectionObserver
 */
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target); // Animate only once
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(el => {
    // Handle delay styling from data attribute
    if (el.dataset.revealDelay) {
      el.style.transitionDelay = el.dataset.revealDelay;
    }
    revealObserver.observe(el);
  });
});

/**
 * Hamburger menu toggle
 */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/**
 * Swiper initialization
 */
var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

/**
 * Initialize EmailJS
 */
(function () {
  emailjs.init("9mtNWvqijNM9ZGmco");
})();

/**
 * Contact form submission
 */
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const responseEl = document.getElementById('formResponse');

  if (!name || !email || !message) {
    responseEl.textContent = "Please fill in all fields.";
    responseEl.classList.remove('hidden');
    return;
  }

  emailjs.sendForm('service_a787njk', 'template_j24uw42', this)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      responseEl.textContent = "Your message has been sent successfully!";
      responseEl.classList.remove('hidden');
      event.target.reset();
    }, function (error) {
      console.log('FAILED...', error);
      responseEl.textContent = "There was an error sending your message. Please try again.";
      responseEl.classList.remove('hidden');
    });
});

function showPhoneNumber() {
  alert("📞 You can reach me at: 0929-889-422");
}