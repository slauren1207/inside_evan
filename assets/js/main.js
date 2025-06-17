/**
* Template Name: FlexStart
* Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
 const on = (type, el, listener, all = false) => {
  const target = select(el, all);
  if (!target) return;

  if (all) {
    target.forEach(e => e.addEventListener(type, listener));
  } else {
    target.addEventListener(type, listener);
  }
}


  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }

window.addEventListener('load', () => {
  aos_init();
});

  /**
   * Sync feature text tab and image tab
   */
  document.querySelectorAll('a[data-bs-toggle="pill"]').forEach(tab => {
    tab.addEventListener('shown.bs.tab', e => {
      const textTabId = e.target.getAttribute('href'); // 예: "#pills-tab2"
      const imageTabId = textTabId.replace('pills-tab', 'img-tab'); // 예: "#img-tab2"

      // 모든 이미지 탭 숨기기
      document.querySelectorAll('#img-tab1, #img-tab2, #img-tab3').forEach(div => {
        div.classList.remove('show', 'active');
      });

      // 해당 이미지 탭만 보여주기
      const imageTab = document.querySelector(imageTabId);
      if (imageTab) {
        imageTab.classList.add('show', 'active');
      }
    });
    
  });

  // memeSwiper 슬라이더 즉시 초기화 (meme.html 전용)
const memeSliderRoot = document.querySelector('.meme-swiper-container');
if (memeSliderRoot) {
  const memeSwiper = new Swiper('.meme-swiper-container', {
  speed: 600,
  loop: true,
   autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
  slidesPerView: 'auto',
  allowTouchMove: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }

});

// 모든 input 필드에 대해 포커스/블러 이벤트 감지
document.querySelectorAll('.scene-title').forEach(input => {
  input.addEventListener('focusin', () => {
    memeSwiper.autoplay.stop();  // 입력 시 autoplay 정지
  });

  input.addEventListener('focusout', () => {
    memeSwiper.autoplay.start(); // 입력 끝나면 다시 재생
  });
});


  const titles = [];
  const buttons = document.querySelectorAll('.submit-slide');
  const resultBtn = document.getElementById('view-result');

  if (resultBtn) resultBtn.style.display = 'none'; // 초기 숨김 처리

  const answered = new Array(buttons.length).fill(false);

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('.scene-title');
    const value = input.value.trim();
    if (!value) {
      alert('제목을 입력해주세요!');
      return;
    }

    titles[index] = value;
    answered[index] = true;

    input.disabled = true;
    btn.textContent = '제출 완료';
    btn.disabled = true;

    // 모든 질문에 답했는지 검사
    const allAnswered = answered.every(a => a === true);
    if (allAnswered) {
      localStorage.setItem('sceneTitles', JSON.stringify(titles));
      if (resultBtn) resultBtn.style.display = 'block';
    } else {
      memeSwiper.slideNext();
    }
  });
});

  resultBtn?.addEventListener('click', () => {
    window.location.href = 'meme-result.html';
  });
}

//meme-result.html 전용: 결과 페이지 렌더링
const resultPageContainer = document.getElementById('result-container');
if (resultPageContainer) {
  const titles = JSON.parse(localStorage.getItem('sceneTitles') || '[]');
  const images = [
    'assets/img/meme/stillcut1.png',
    'assets/img/meme/stillcut2.png',
    'assets/img/meme/stillcut3.png',
    'assets/img/meme/stillcut4.png'
  ];

  if (!titles.length) {
    resultPageContainer.innerHTML = `<p style="text-align:center;">입력된 제목이 없습니다.</p>`;
  } else {
    titles.forEach((title, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'scene-result';
      wrapper.innerHTML = `
        <h3>${title}</h3>
        <br>
        <img src="${images[index]}" alt="스틸컷 ${index + 1}" />
      `;
      resultPageContainer.appendChild(wrapper);
    });
  }
}

// question.html 전용 - 질문 제출 후 다음 탭 자동 전환
if (document.getElementById('form1') && document.getElementById('form2') && document.getElementById('form3')) {
  const answers = {};
  let answeredCount = 0;

function handleFormSubmit(questionId, formId, nextTabId = null) {
  const form = document.getElementById(formId);
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const selected = form.querySelector(`input[name="${questionId}"]:checked`);
    const reasonInput = document.getElementById(`reason${questionId.slice(1)}`);

    // 선택은 필수, 이유는 선택
    if (!selected) {
      alert("선택지를 고르세요!");
      return;
    }

    const reason = reasonInput ? reasonInput.value.trim() : "";

    // 답변 저장
    answers[questionId] = {
      choice: selected.value,
      reason: reason
    };

    // 버튼 변경
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = '제출 완료';
    submitBtn.disabled = true;

    // 라디오 버튼 전체 비활성화
    form.querySelectorAll(`input[name="${questionId}"]`).forEach(input => {
      input.disabled = true;
    });

    // 텍스트박스 비활성화
    if (reasonInput) reasonInput.disabled = true;

    answeredCount++;

    // 다음 탭 자동 전환
    if (nextTabId) {
      const nextTabTrigger = document.querySelector(`a[href="${nextTabId}"]`);
      if (nextTabTrigger) new bootstrap.Tab(nextTabTrigger).show();
    }

    // 결과 보기 버튼 생성
    if (answeredCount === 3 && !document.getElementById('resultButton')) {
      const btn = document.createElement('button');
      btn.id = 'resultButton';
      btn.className = 'btn btn-success mt-4';
      btn.textContent = '결과 보기';
      btn.onclick = () => {
        const aCount = Object.values(answers)
          .filter(val => val.choice === 'A').length;
        if (aCount >= 2) {
          window.location.href = 'question-result_A.html';
        } else {
          window.location.href = 'question-result_B.html';
        }
      };
      document.querySelector('.features .container').appendChild(btn);
    }
  });
}

  handleFormSubmit('q1', 'form1', '#pills-tab2');
  handleFormSubmit('q2', 'form2', '#pills-tab3');
  handleFormSubmit('q3', 'form3', null);
}

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();

