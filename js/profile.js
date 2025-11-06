// ---------- scroll down button ----------
document.querySelector('.field').addEventListener('click', function() {
    document.querySelector('.content02').scrollIntoView({ behavior: 'smooth' });
});

AOS.init({
    once: false, // 다시 스크롤될 때마다 애니메이션 재생
});