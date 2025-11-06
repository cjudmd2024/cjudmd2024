document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 118,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        allowTouchMove: true,

        on: {
            reachEnd: function() {
                setTimeout(() => {
                    swiper.slideTo(0); // 첫 번째 슬라이드로 이동
                }, 2000);
            }
        }
    });

    // 기본 동작 방지
    document.getElementById('next02').addEventListener('click', function(event) {
        event.preventDefault();
    });

    document.getElementById('prev02').addEventListener('click', function(event) {
        event.preventDefault();
    });
});
