//------------- 검색창 -------------
document.getElementById("search-button").addEventListener("click", function() {
    const searchInput = document.getElementById("search-input");
    const searchValue = searchInput.value.trim().toLowerCase();

    // 모든 이미지를 표시
    const allImages = document.querySelectorAll(".image-item");
    allImages.forEach(imageItem => {
        imageItem.style.display = "block"; // 기본적으로 모든 이미지를 보이게 함
    });

    // 검색어와 일치하지 않는 이미지를 숨김
    if (searchValue) {
        allImages.forEach(imageItem => {
            const caption = imageItem.querySelector(".image-caption").textContent.toLowerCase();
            if (!caption.includes(searchValue)) {
                imageItem.style.display = "none"; // 검색어와 일치하지 않는 이미지는 숨김
            }
        });
    }

    // 검색 입력창 초기화
    searchInput.value = ""; // 입력창 비우기
});

// Enter 키를 눌렀을 때 검색 기능 실행
document.getElementById("search-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") { // Enter 키가 눌렸는지 확인
        document.getElementById("search-button").click(); // 돋보기 버튼 클릭 이벤트 실행
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 모든 .image-item 요소를 선택합니다
    const imageItems = document.querySelectorAll(".image-item");

    // 각 이미지 항목에 클릭 이벤트를 추가합니다
    imageItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            // index에 1을 더해 1부터 시작하는 번호로 설정
            const pageNumber = index + 1;
            
            // 각 디자이너 페이지로 이동하도록 URL 생성
            window.location.href = `designer${pageNumber}.html`;
        });
    });
});
