// header_lnb
var lastScrollTop = 0;
var delta = 5;
// 스크롤시 사라지기
$(window).on('scroll', function () {
	var st = $(this).scrollTop();
	var lnb = $('#header_lnb');

	if (st <= 100) {
		// header가 보이는 상태 → header_lnb는 100px (transition 유지)
		lnb.removeClass('nav-up nav-down').css('top', '100px');
	} else {
		// header가 안 보이는 상태 → lnb는 숨기거나 나타남
		if (Math.abs(lastScrollTop - st) <= delta)
			return;

		if (st > lastScrollTop) {
			// 스크롤 내릴 때 → 숨김
			lnb.removeClass('nav-down').addClass('nav-up');
		} else {
			// 스크롤 올릴 때 → 0px에 나타남
			lnb.removeClass('nav-up').addClass('nav-down');
		}
	}

	lastScrollTop = st;
});

// 메뉴 누르면 부드럽게 넘어가기
$(function () {
	$('a[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 500);//움직이는 시간 조정
				return false;
			}
		}
	});
});// header_lnb

// contents1
// 아래에서 위로 올라오는 스크롤 애니메이션
document.querySelectorAll('.scroll-up-fade').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const rect = entry.target.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
        // 화면에 20% 이상 보이면 active
        entry.target.classList.add('active');
      } else {
        // 오직 '아래'로 완전히 벗어난 경우에만 active 제거!
        if (rect.top > windowHeight) {
          entry.target.classList.remove('active');
        }
        // 화면 위로 벗어난 건 유지!
      }
    });
  }, {
    threshold: [0, 0.2, 0.8, 1]
  });
  observer.observe(el);
});

// contents1

// flower_pixed
function checkFlowerPixed() {
	var winWidth = $(window).width();

	// 1900px 이하에서는 무조건 숨김
	if (winWidth <= 1900) {
		$('.body_flower_pixed').fadeOut();
		return;
	}

	var scrollTop = $(window).scrollTop();
	var windowHeight = $(window).height();

	// contents1 범위
	var c1Top = $('#main_banner').offset().top;
	var c1Bottom = c1Top + $('#main_banner').outerHeight();

	var c5Top = $('#contents5').offset().top;
	var c5Bottom = c5Top + $('#contents5').outerHeight();

	var c4Top = $('#contents4').offset().top;
	var c4Bottom = c4Top + $('#contents4').outerHeight();

	var videoTop = $('#video_wrap').offset().top;
	var videoBottom = videoTop + $('#video_wrap').outerHeight();

	// 현재 화면 중앙 위치
	var currentMiddle = scrollTop + windowHeight / 2;

	// main_banner에 걸치면 숨김
	if (currentMiddle >= c1Top && currentMiddle <= c1Bottom) {
		$('.body_flower_pixed').fadeOut();
	}
	// contents5(꽃차배너)에 걸치면 숨김 ← 이 줄이 추가된 부분!
	else if (currentMiddle >= c5Top && currentMiddle <= c5Bottom) {
		$('.body_flower_pixed').fadeOut();
	}
	// contents4~video_wrap에 걸치면 숨김 (기존 유지)
	else if (currentMiddle >= c4Top && currentMiddle <= videoBottom) {
		$('.body_flower_pixed').fadeOut();
	} else {
		$('.body_flower_pixed').fadeIn();
	}
}
$(window).on('scroll resize', checkFlowerPixed);

// 페이지 로딩시에도 1번 실행!
$(function () {
	checkFlowerPixed();
});// flower_pixed

// contents3
$(document).ready(function () {
	// contents5
	var swiper5 = new Swiper(".contents5_banner", {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		speed: 1000,
	});
});
// contents3

// contents4
document.querySelectorAll('.slide-in-img').forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const rect = entry.target.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
        entry.target.classList.add('active');
      } else {
        if (rect.top > windowHeight) {
          entry.target.classList.remove('active');
        }
      }
    });
  }, {
    threshold: [0, 0.2, 0.8, 1]
  });
  observer.observe(el);
});
// contents4

// contents5
var swiper = new Swiper(".contents4_swiper", {
	slidesPerView: 1,
	centeredSlides: false,
	spaceBetween: 0,
	loop: true,
	navigation: {
		nextEl: "#contents4 .swiper-button-next",
		prevEl: "#contents4 .swiper-button-prev",
	},
});	// contents5

// review
$(document).ready(function () {
	// ─── review (13개 카드 슬라이더) ───
	var reviewSwiper = new Swiper('.review-swiper', {
		slidesPerView: 5,           // 한 화면에 5개 카드
		spaceBetween: 10,           // 카드 간격
		centeredSlides: true,       // 활성 슬라이드 중앙 정렬
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		navigation: {
			nextEl: '.review-next',
			prevEl: '.review-prev'
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		breakpoints: {
			1320: { slidesPerView: 5 },
			1024: { slidesPerView: 4 },
			768: { slidesPerView: 3 },
			480: { slidesPerView: 1 }
		}
	});
});
// review