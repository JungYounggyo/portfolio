import { showPopup } from "./component/contactPopup.js";
import { createProjectComponent } from "./component/projects.js";

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
    let hamburger = document.querySelector('.menu-hamburger');
    if(hamburger.classList.contains('on')) hamburger.classList.remove('on');

    // 메뉴 클릭 시 메뉴 닫기
    link.closest('.menu-box').classList.remove('on');
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

      sectionToggling(link);
    }
  });

  // 햄버거 메뉴 클릭 시 메뉴 토글 (반응형 모바일 시 사용)
  document.querySelector('.menu-hamburger').addEventListener('click', e => {
    document.querySelector('.menu-box').classList.toggle('on');
    e.currentTarget.classList.toggle('on');
  });

  // section 태그 acitive 클래스 토글링
  function sectionToggling(link) {
    let sections = document.querySelectorAll(".sections");
        
    sections.forEach((sec) => {
      let index = Array.from(link.closest(".menu-list").children).indexOf(link.parentElement);
        
      sec.classList.remove("active");
      sections[index].classList.add("active");
    });
  }

  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  };

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let id = entry.target.getAttribute("id");
        sectionToggling(document.getElementsByClassName(id)[0]);
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

  // --- introduce Section ---
  document.querySelectorAll('.question').forEach((question) => {
    question.addEventListener('click', () => {
      let allItems = document.querySelectorAll('.introduce-item');
      let currentItem = question.parentElement;

      allItems.forEach((item) => {
        if (item !== currentItem) {
          item.classList.remove('open');
          item.querySelector('.answer').scrollTop = 0;
        }
      });

      currentItem.classList.toggle('open');
    });
  });

  // --- Skill Section ---
  // 스킬 데이터 정의 (이미지 경로와 main 플래그)
  let skillsData = [
      { img: "./images/langImg/1.png", main: true, name: "JavaScript" },
      { img: "./images/langImg/2.png", main: true, name: "CSS3" },
      { img: "./images/langImg/3.png", main: true, name: "HTML" },
      { img: "./images/langImg/5.png", main: true, name: "React.js" },
      { img: "./images/langImg/14.png", main: true, name: "Next.js" },
      { img: "./images/langImg/10.png", main: true, name: "MySql" },
      { img: "./images/langImg/13.png", main: true, name: "Tailwind CSS" },
      { img: "./images/langImg/4.png", main: true, name: "Bootstrap" },
      { img: "./images/langImg/8.png", main: true, name: "GitHub" },
      { img: "./images/langImg/15.png", main: true, name: "Git" },
      { img: "./images/langImg/7.png", main: true, name: "TypeScript" },
      { img: "./images/langImg/9.png", main: false, name: "jQuery" },
      { img: "./images/langImg/12.png", main: false, name: "Jenkins" },
      { img: "./images/langImg/6.png", main: false, name: "Svelte" },
      { img: "./images/langImg/11.png", main: false, name: "PHP" },
  ];

  // 스킬 렌더링 함수 (모드에 따라 필터링)
  function renderSkills(isMainMode = true) {
      let skillListEl = document.querySelector('.skill-list');
      skillListEl.innerHTML = '';

      let filteredSkills = isMainMode ? skillsData.filter(skill => skill.main) : skillsData.filter(skill => !skill.main);

      // 행별 그룹화 (4개씩)
      for (let i = 0; i < filteredSkills.length; i += 4) {
          let row = document.createElement('div');
          row.className = 'skill-row';
          filteredSkills.slice(i, i + 4).forEach(skill => {
              let item = document.createElement('div');
              item.className = 'skill-item' + (skill.main ? ' can' : '');
              item.innerHTML = `<img src="${skill.img}" alt="${skill.name}">`;
              row.appendChild(item);
          });
          skillListEl.appendChild(row);
      }
  }

  // 초기 렌더링 (Main 모드)
  renderSkills(true);

  // 토글 시 높이 및 scaleY 애니메이션 적용
  let checkbox = document.getElementById('toggleCheckbox');
  let skillContent = document.querySelector('.skill-content');

  checkbox.addEventListener('change', () => {
      let isMainMode = !checkbox.checked; // 체크 해제: Main 모드, 체크: Experienced 모드
      checkbox.closest(".skill-box").classList.toggle("main", isMainMode);

      // 애니메이션 시작: 높이 0, scaleY 0 (가운데 기준 축소)
      skillContent.style.height = '0px';
      skillContent.style.transform = 'scaleY(0)';

      // DOM 재생성 (새 모드에 맞춰)
      setTimeout(() => {
          renderSkills(isMainMode);
          // 새로운 높이와 scaleY 1로 전환 (가운데 기준 확장)
          skillContent.style.height = skillContent.scrollHeight + 'px';
          skillContent.style.transform = 'scaleY(1)';
      }, 10);

      // 애니메이션 끝나면 height: auto로 리셋 (transform은 유지)
      setTimeout(() => {
          skillContent.style.height = 'auto';
      }, 310); // transition 시간 + 여유
  });
  
  // prfoject Section
  let projectsData = [
    {
        title: "Responsibility Project",
        imageUrl: "./images/projects/responsibility.png",
        languages: ["React", "Next.js", "scss", "zod", "react-hook-form","Jenkins"],
        url:"https://www.argo.it.kr/sign-in"
    },
    {
        title: "My Trading info",
        imageUrl: "./images/projects/mti.png",
        languages: ["HTML5", "CSS3", "JavaScript (ES6)", "Responsive Web", "Cross-Browser Compatibility", "Jenkins"],
        url: "https://www.mytradinginfo.com/"
    },
    {
        title: "Mario Game",
        imageUrl: "./images/projects/mario.png",
        languages: ["React", "CSS3", "Responsive Web","Github Pages"],
        url:"https://jungyounggyo.github.io/mario-game/"
    },
    {
        title: "My Portfolio",
        imageUrl: "./images/projects/portfolio.png",
        languages: ["HTML5", "CSS3", "JavaScript (ES6)", "Responsive Web", "Cross-Browser Compatibility","Github Pages"],
        url: window.location.origin + "/" + window.location.pathname.split('/')[1] + '/'
    }
  ];

  // 렌더링
  let projectListEl = document.getElementById("project-list");
  let dotsContainer = document.getElementById("project-dots");

  projectsData.forEach((project, index) => {
      let component = createProjectComponent(project.imageUrl, project.title, project.languages, index, project.url);
      projectListEl.appendChild(component);

      let dot = document.createElement("span");
      dot.className = "dot";
      dot.dataset.index = index;

      dot.addEventListener("click", () => {
          let target = document.querySelector(`.project[data-index="${index}"]`);
          target.scrollIntoView({ behavior: "smooth" });
      });

      dotsContainer.appendChild(dot);
  });

  // 감지 & 애니메이션 & dot sync
  let observe = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          let index = entry.target.dataset.index;
          let dot = document.querySelector(`.dot[data-index="${index}"]`);

          if (entry.isIntersecting) {
              entry.target.classList.add("visible");

              document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
              dot.classList.add("active");
          }
      });
  }, {
      threshold: 0.5
  });

  document.querySelectorAll(".project").forEach(project => {
      observe.observe(project);
  });


  // contact Section
  let copyContact = [
    "010-4019-9816",
    "qwer2435@naver.com",
    ""
  ];
  
  let contactMenus = document.querySelectorAll('.contact-icon');
    
  contactMenus.forEach((menu, index) => {
    menu.addEventListener('click', () => {
      if(index === 2) return; // 깃허브는 복사 기능 제외
      navigator.clipboard.writeText(copyContact[index])
        .then(() => {
          switch (index) {
            case 0:
              showPopup('전화번호가');
              break;
            case 1:
              showPopup('이메일이');
              break;
            default:
              break;
          }
        })
        .catch(err => {
          console.error("복사 실패:", err);
          alert("주소 복사에 실패했습니다.");
      });
    })
  })

  // --- Global Event Listener Cleanup ---
  window.addEventListener('beforeunload', () => {
    clearTimeout(animationTimer); // 페이지 언로드 시 모든 타이머 정리
  });
});