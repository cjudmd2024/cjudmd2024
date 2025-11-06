document.addEventListener('DOMContentLoaded', () => {
    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } = Matter;

    // Canvas 설정
    const canvas = document.getElementById('canvas');
    canvas.height = 10000; // 세로 사이즈를 9000으로 설정
    const engine = Engine.create();
    const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: canvas.width,
            height: canvas.height,
            wireframes: false,
            background: '#000000'
        }
    });

    // 이미지의 실제 크기 (픽셀 단위)
    const originalImageWidth = 170;  // 이미지 원본 너비
    const originalImageHeight = 170; // 이미지 원본 높이

    // 스케일 팩터 설정
    const scaleFactor = 0.27;
    let targetWidth = originalImageWidth * scaleFactor;
    let targetHeight = originalImageHeight * scaleFactor;
    let clickableAreaSize = 170; // 클릭 가능한 영역 크기

    const boxes = [];
    const boxCount = 10; // 총 10개의 박스
    const imagePaths = [
        'img/box/Service1.png',
        'img/box/Service2.png',
        'img/box/Service3.png',
        'img/box/Service4.png',
        'img/box/Service5.png',
        'img/box/Service6.png',
        'img/box/Service7.png',
        'img/box/Service8.png',
        'img/box/Service9.png',
        'img/box/Service10.png'
        
    ];

    // 각 박스에 대한 페이지 매핑 (상위 폴더로 이동)
    const boxPageMapping = [
        'interaction/project1.html', // 0번째 박스
        'interaction/project2.html', // 1번째 박스
        'interaction/project3.html', // 2번째 박스
        'interaction/project4.html', // 3번째 박스
        'interaction/project5.html', // 4번째 박스
        'interaction/project6.html', // 5번째 박스
        'interaction/project7.html', // 6번째 박스
        'interaction/project8.html', // 7번째 박스
        'interaction/project9.html', // 8번째 박스
        'interaction/project10.html' // 9번째 박스
    ];

    // 작은 화면용 크기 조정 함수
    const adjustBoxSizeForSmallScreens = () => {
        if (window.innerWidth <= 768) {
            targetWidth = originalImageWidth * 0.13; // 작은 화면에서는 20% 크기로 조정
            targetHeight = originalImageHeight * 0.13;
            clickableAreaSize = 72; // 클릭 가능한 영역 크기도 줄이기
        } else {
            targetWidth = originalImageWidth * scaleFactor;
            targetHeight = originalImageHeight * scaleFactor;
            clickableAreaSize = 150; // 기본 클릭 가능한 영역 크기
        }
    };

    // 경계 생성 함수
    const createBounds = () => {
        const ground = Bodies.rectangle(canvas.width / 2, canvas.height + 50, canvas.width, 100, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-50, canvas.height / 2, 100, canvas.height, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(canvas.width + 50, canvas.height / 2, 100, canvas.height, { isStatic: true, render: { visible: false } });
        World.add(engine.world, [ground, leftWall, rightWall]);
    };

// 박스 생성 함수
const createBoxes = () => {
    // 이전에 생성된 박스 및 매핑을 모두 초기화
    boxes.length = 0;

    for (let i = 0; i < boxCount; i++) {
        const position = {
            x: Math.random() * (canvas.width - targetWidth) + targetWidth / 2,
            y: Math.random() * (canvas.height - targetHeight * 2) * -1 - 400
        };
        
        const box = Bodies.rectangle(
            position.x,
            position.y,
            targetWidth + clickableAreaSize * 1.63,  
            targetHeight + clickableAreaSize * 1.63,
            {
                density: 1,
                frictionAir: 0.03,
                restitution: 0.5,
                render: {
                    sprite: {
                        texture: imagePaths[i],
                        xScale: targetWidth / originalImageWidth,
                        yScale: targetHeight / originalImageHeight
                    }
                }
            }
        );

        // 각 박스에 링크 인덱스 정보를 추가
        box.linkIndex = i;
        boxes.push(box);
        World.add(engine.world, [box]);

        const initialVelocity = {
            x: Math.random() * 2 - 2,
            y: Math.random() * 5
        };
        Matter.Body.setVelocity(box, initialVelocity);
    }
};






    
    // 마우스 상호작용 설정 함수
    const setupMouseInteraction = () => {
        const mouse = Mouse.create(canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        World.add(engine.world, mouseConstraint);

        // 상호작용 이벤트
        let clickStartTime = 0;

        Events.on(mouseConstraint, 'mousedown', event => {
            clickStartTime = new Date().getTime();
            const mousePosition = event.mouse.position;
            const clickedBox = boxes.find(box => Matter.Bounds.contains(box.bounds, mousePosition));

            if (clickedBox) {
                mouseConstraint.body = clickedBox; // 선택한 박스를 마우스 제약 조건에 설정
            }
        });

        Events.on(mouseConstraint, 'mouseup', () => {
            mouseConstraint.body = null;
            const currentTime = new Date().getTime();
            const clickDuration = currentTime - clickStartTime;

            if (clickDuration <= 150) {
                const clickedBox = boxes.find(box => Matter.Bounds.contains(box.bounds, mouse.position));

                if (clickedBox) {
                    const boxIndex = boxes.indexOf(clickedBox);
                    const redirectTo = boxPageMapping[boxIndex];
                    window.location.href = redirectTo;
                }
            }
        });
    };
    

    
// 부드러운 스크롤 변수
let isScrolling = false;
let scrollTarget = window.scrollY; // 최종 목표 스크롤 위치
let currentScrollPosition = window.scrollY; // 현재 스크롤 위치

const smoothScrollStep = () => {
    // 목표 위치와 현재 위치의 차이 조정 (더 빠르게 이동)
    const distance = (scrollTarget - currentScrollPosition) * 0.5;

    if (Math.abs(distance) < 1) { // 멈추는 기준을 더 작게 설정
        isScrolling = false;
        return;
    }

    currentScrollPosition += distance;
    window.scrollTo(0, currentScrollPosition);

    requestAnimationFrame(smoothScrollStep);
};


// 마우스 휠 이벤트 처리
const handleMouseWheel = (event) => {
    event.preventDefault(); // 기본 스크롤 동작 방지

    // 마우스 휠 움직임에 따라 목표 스크롤 위치 설정
    scrollTarget += event.deltaY;

    // 페이지의 상단 및 하단 한계를 설정하여 너무 벗어나지 않도록 제한
    scrollTarget = Math.max(0, Math.min(scrollTarget, document.body.scrollHeight - window.innerHeight));

    // 부드러운 스크롤 시작
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(smoothScrollStep);
    }
};

// 마우스 휠 이벤트 리스너 추가
const addWheelListener = () => {
    window.addEventListener('wheel', handleMouseWheel, { passive: false });
};

const removeWheelListener = () => {
    window.removeEventListener('wheel', handleMouseWheel);
};

// 포커스가 돌아올 때 이벤트 리스너를 다시 활성화
window.addEventListener('focus', addWheelListener);
window.addEventListener('blur', removeWheelListener);

// 초기 로딩 시 이벤트 리스너 활성화
addWheelListener();




    
    // 화면 크기에 따라 캔버스 크기 조정
    const resizeCanvas = () => {
        canvas.width = window.innerWidth; // 캔버스 너비 설정
    
        // 너비가 768px 이하일 때 캔버스 세로 크기를 800px로 설정
        if (canvas.width <= 768) {
            canvas.height = 1000; // 세로 크기 800px
        } else {
            canvas.height = 1800; // 기본 세로 크기
        }
    
        // 작은 화면일 경우 박스 크기 조정
        adjustBoxSizeForSmallScreens();
    
        // 경계와 박스 다시 생성
        World.clear(engine.world);
        createBounds();
        createBoxes();
        setupMouseInteraction(); // 마우스 상호작용 재설정
    
        // 렌더 옵션 업데이트
        render.options.width = canvas.width;
        render.options.height = canvas.height;
    };
    

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // 처음 로드 시 크기 조정

    // 엔진과 렌더러 실행
    Engine.run(engine);
    Render.run(render);

    // 박스의 경계를 확인하고 위치를 재설정
    function checkBounds() {
        boxes.forEach(box => {
            if (box.position.y > canvas.height + 50) {
                Matter.Body.setPosition(box, {
                    x: Math.random() * (canvas.width - targetWidth) + targetWidth / 2,
                    y: Math.random() * (canvas.height - targetHeight * 2) * -1
                });
                Matter.Body.setVelocity(box, { x: Math.random() * 2 - 1, y: Math.random() * 5 });
            }
        });
    }

    // 렌더링 루프
    (function renderLoop() {
        requestAnimationFrame(renderLoop);
        checkBounds();
    })();
});


function toggleButtonText() {
    const button = document.querySelector('.boton-elegante');
    
    if (window.innerWidth <= 768) {
        // 화면 너비가 768px 이하일 때 '보기' 텍스트 숨기기
        button.querySelector('span2').style.display = 'none'; // span 요소 숨기기
    } else {
        // 화면 너비가 768px을 초과할 때 '보기' 텍스트 다시 보이기
        button.querySelector('span2').style.display = 'inline'; // span 요소 보이기
    }
}

// 초기 로딩 시 텍스트 설정
toggleButtonText();

// 창 크기 변화 시 텍스트 변경
window.addEventListener('resize', toggleButtonText);
