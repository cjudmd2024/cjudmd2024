let slider = document.querySelector('.slider-wrapper');
let items = document.querySelectorAll('.slider .slider-wrapper .grid-content');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.pagenation li');

let lengthItems = items.length - 1;
let active = 0; // 현재 슬라이드 인덱스
let startX, endX; // 터치 시작과 끝 위치

next.onclick = function() {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

function reloadSlider() {
    const itemWidth = items[0].offsetWidth;
    slider.style.transform = `translateX(-${itemWidth * active}px)`;

    // 페이지네이션 업데이트
    let last_active_dot = document.querySelector('.pagenation li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);
}

// 페이지네이션 클릭 이벤트
dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    });
});

// 페이지 로드 시 첫 번째 슬라이드로 이동
window.onload = function() {
    active = 0;
    reloadSlider();
};

// 터치 이벤트 추가 (모바일에서 슬라이드 터치로 이동)
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
    if (startX > endX + 50) { // 왼쪽으로 스와이프하면 다음 슬라이드로 이동
        next.click();
    } else if (startX < endX - 50) { // 오른쪽으로 스와이프하면 이전 슬라이드로 이동
        prev.click();
    }
});

// 섹션 이동 부드러운 스크롤 효과
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}
