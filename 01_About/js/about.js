// ---------- scroll down button ----------
document.querySelector('.field').addEventListener('click', function() {
    document.querySelector('.content02').scrollIntoView({ behavior: 'smooth' });
});

// download button
document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = './img/section03/poster.png';  // 다운로드할 파일 경로
    link.download = '2024DMDPoster.png';   // 저장될 파일 이름
    link.click();
});

// 상단 스크롤 버튼
let mybutton = document.getElementById("myBtn");

// 스크롤 시 버튼 보이기 및 숨기기
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add("show");
        mybutton.classList.remove("hide");
    } else {
        mybutton.classList.add("hide");
        mybutton.classList.remove("show");
    }
}

// 부드러운 상단 이동 애니메이션
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드러운 스크롤
    });
}

// 모든 리스트 요소 가져오기
const lists = document.querySelectorAll("#list");

lists.forEach((list) => {
    list.addEventListener("click", () => {
        // 현재 리스트의 expanded 상태 토글
        list.classList.toggle("expanded");

        // 다른 리스트 닫기 (확장 상태 제거)
        lists.forEach((otherList) => {
            if (otherList !== list) {
                otherList.classList.remove("expanded");
            }
        });
    });
});



