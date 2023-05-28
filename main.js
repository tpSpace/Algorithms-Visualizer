document.addEventListener("DOMContentLoaded", function() {
  const fadeInElements = document.querySelectorAll(".fade-in");

  function checkVisibility() {
    for (const element of fadeInElements) {
      if (isElementInViewport(element)) {
        element.classList.add("show");
      } else {
        element.classList.remove("show");
      }
    }
  }

  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  window.addEventListener('scroll', function() {
    var backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 200) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  document.getElementById('back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        const line = entry.target.querySelector('.horizontal-line');
        setTimeout(() => {
          line.classList.add('animate-line');
        }, 2000); // Adjust the delay as needed
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  // Call checkVisibility on page load
  checkVisibility();

  // Recheck visibility on scroll
  window.addEventListener('scroll', checkVisibility);
});










