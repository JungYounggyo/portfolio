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

  document.querySelector('nav').addEventListener('click', e => {
    let link = e.target.closest('a');
    if (link && link.closest('.menu-item')) {
      e.preventDefault();

      let targetId = link.getAttribute('href').slice(1);
      let targetSection = document.getElementById(targetId);
      if (targetSection) {
        smoothScrollTo(targetSection, 700);
      }

      let href = link.getAttribute("href");
      history.replaceState(null, null, href);
      location.href = href;
      document.querySelector("body").classList.add("loaded");
    }
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

  // --- Greeting Section / Typing Animation ---
  let typedTextElement = document.querySelector('.typed-text');
  let textToType = "프론트엔드 개발자 정영교 포트폴리오";
  let typingSpeed = 100;
  let erasingSpeed = 50;
  let typingCharIndex = 0;
  let animationTimer;

  // 글자를 타이핑하는 내부 함수
  function typeText() {
    if (typingCharIndex < textToType.length) {
      typedTextElement.textContent += textToType.charAt(typingCharIndex);
      typingCharIndex++;
      typedTextElement.classList.add('has-cursor');
      animationTimer = setTimeout(typeText, typingSpeed);
    } else {
      typedTextElement.classList.add('has-cursor');
      replayButton.classList.add('show');
    }
  }

  function eraseText() {
    if (typedTextElement.textContent.length > 0) {
      typedTextElement.textContent = textToType.substring(0, typedTextElement.textContent.length - 1);
      typedTextElement.classList.add('has-cursor');
      animationTimer = setTimeout(eraseText, erasingSpeed);
    } else {
      typedTextElement.classList.remove('has-cursor');
      typingCharIndex = 0;
      
      animationTimer = setTimeout(typeText, 500); 
    }
  }

  // 초기 타이핑 시작
  setTimeout(() => {
    typeText();
  }, 300);

  // 하드코딩으로 맞춘 텍스트 애니메이션 종료 시점
  setTimeout(() => {
    document.querySelector('body').classList.add('loaded');
  }, 2200);

  let replayButton = document.querySelector('.replay-button');

  replayButton.addEventListener('click', () => {
    clearTimeout(animationTimer);
    replayButton.classList.remove('show');
    eraseText();
  });

  let modeChangeButton = document.querySelector('.mode-change');
  let body = document.body;

  if (modeChangeButton) {
      modeChangeButton.addEventListener('click', () => {
          body.classList.toggle('dark');
          modeChangeButton.classList.toggle('light');
          modeChangeButton.classList.toggle('dark');
      });
  }

  // --- Skill Section Toggle ---
  let checkbox = document.getElementById('toggleCheckbox');

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      checkbox.closest(".skill-box").classList.add("main");
    } else {
      checkbox.closest(".skill-box").classList.remove("main");
    }
  });

  // --- Global Event Listener Cleanup ---
  window.addEventListener('beforeunload', () => {
    clearTimeout(animationTimer); // 페이지 언로드 시 모든 타이머 정리
  });
});