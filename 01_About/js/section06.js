document.addEventListener("DOMContentLoaded", function() {
    const lists = document.querySelectorAll('#list');

    lists.forEach(list => {
        list.addEventListener('click', function() {
            const studentImg = this.querySelector('.student-img');
            const listContent = this.querySelector('.list-content');

            // .student-img 요소의 표시와 숨김을 toggle
            studentImg.classList.toggle('expanded');
            listContent.classList.toggle('expanded');
        });
    });
});
