document.addEventListener("DOMContentLoaded", () => {
  let navLinks = document.querySelectorAll(".menu-item a");
  let sections = document.querySelectorAll(".sections");

  function smoothScrollTo(targetElement, duration = 600) {
    let targetY = targetElement.getBoundingClientRect().top + window.scrollY;
    let startY = window.scrollY;
    let startTime = performance.now();

    function scrollStep(currentTime) {
      let elapsed = currentTime - startTime;
      let progress = Math.min(elapsed / duration, 1);
      let ease = 1 - Math.pow(1 - progress, 3);
      let scrollTo = startY + (targetY - startY) * ease;
      window.scrollTo(0, scrollTo);
      if (progress < 1) requestAnimationFrame(scrollStep);
    }

    requestAnimationFrame(scrollStep);
  }

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            console.log(link.getAttribute('href'))
            let targetId = link.getAttribute("href").slice(1);
            let targetSection = document.getElementById(targetId);
            if (targetSection) {
                smoothScrollTo(targetSection, 700);
            }

            let href = link.getAttribute("href");
            history.replaceState(null, null, href);
            location.search = href;
        });
    });

  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };

  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let id = entry.target.getAttribute("id");

        navLinks.forEach(link => link.classList.remove("active"));

        let activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
