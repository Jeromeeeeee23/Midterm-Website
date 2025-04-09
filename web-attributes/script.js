// Scroll-based animations for text elements
window.addEventListener('scroll', function() {
  const text1 = document.querySelector('.text1');
  const text2 = document.querySelector('.text2');
  const text3 = document.querySelector('.text3');
  
  let scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    // Apply animations when scrolling down
    text1.style.animation = "slideRight 1s ease forwards";
    text2.style.animation = "slideLeft 1s ease forwards";
    text3.style.animation = "slideRight 1s ease forwards";
  } else {
    if (text1.style.animation.includes('slideRight')) {
      text1.style.animation = "slideRightReverse 1s ease forwards";
      text2.style.animation = "slideLeftReverse 1s ease forwards";
      text3.style.animation = "slideRightReverse 1s ease forwards";
    }
  }
});

// Intersection observer for About section animations
document.addEventListener('DOMContentLoaded', function () {
  const aboutSection = document.getElementById('about');
  const elementsToAnimate = document.querySelectorAll('.pic, .text4, .about-me,.download-cv-btn');

  const observerOptions = {
    threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate');
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(element => observer.observe(element));

  // When the About section is clicked, trigger the animation
  const aboutLink = document.querySelector('.button2');
  aboutLink.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    window.location.hash = '#about'; // Scroll to the About section
    
    // Add 'active' class to trigger animations
    setTimeout(() => {
      aboutSection.classList.add('active');
    }, 300); // Adding a small delay to ensure smooth scroll
  });
});

// Hamburger menu toggle
function toggleMenu(){
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Swiper for trending slider
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

// Form submission with EmailJS
(function() {
  emailjs.init("9mtNWvqijNM9ZGmco"); 
})();

// Form submission event listener
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent default form submission

  // Basic validation
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    document.getElementById('formResponse').textContent = "Please fill in all fields.";
    document.getElementById('formResponse').classList.remove('hidden');
    return;  // Don't send the email if validation fails
  }

  // Send form data to EmailJS
  emailjs.sendForm('service_a787njk', 'template_j24uw42', event.target)
    .then(function(response) {
      console.log('SUCCESS!', response);
      document.getElementById('formResponse').textContent = "Your message has been sent successfully!";
      document.getElementById('formResponse').classList.remove('hidden');
      event.target.reset();  // Reset the form after successful submission
    }, function(error) {
      console.log('FAILED...', error);
      document.getElementById('formResponse').textContent = "There was an error sending your message. Please try again.";
      document.getElementById('formResponse').classList.remove('hidden');
    });
});
