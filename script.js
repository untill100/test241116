// 돋보기가 이미지 영역을 벗어났을 때, 돋보기를 채워줄 투명 이미지(base64)
const transparentPixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGBgAAAABQABpfZFQAAAAABJRU5ErkJggg==";

const thumbnail = document.querySelector("#thumbnail");

const zoom = document.querySelector("#zoom");
const result = document.querySelector("#result");

window.addEventListener("mousemove", function( event ) { // 마우스가 움직일 때마다..
    zoom.style.left = `${event.clientX - zoom.offsetWidth / 2}px`; // 돋보기의 위치를 변경할 것이고..
    zoom.style.top = `${event.clientY - zoom.offsetHeight / 2}px`;
    
    const thumbnailBounds = thumbnail.getBoundingClientRect(); // 썸네일을 감싸고 있는 사각형 범위의 값을 가져와서..
    if (
        event.clientX > thumbnailBounds.left && // 현재 마우스가 사각형 범위 내에 들어 있다면..
        event.clientX < thumbnailBounds.right &&
        event.clientY > thumbnailBounds.top &&
        event.clientY < thumbnailBounds.bottom
    ) {
        result.src = thumbnail.src; // 돋보기 내부의 이미지 주소를 변경!
    
        const scale = 2; // 두 배로 확대한 이미지를 기반으로, 좌표 계산!
        const thumbnailWidth = thumbnail.offsetWidth;
        const thumbnailHeight = thumbnail.offsetHeight;
    
        result.style.width = `${thumbnailWidth * scale}px`;
        result.style.height = `${thumbnailHeight * scale}px`;
    
        const offsetX = event.clientX - thumbnailBounds.left - zoom.offsetWidth / 2 + (thumbnailWidth * (scale - 1)) / 2;
        const offsetY = event.clientY - thumbnailBounds.top - zoom.offsetHeight / 2 + (thumbnailHeight * (scale - 1)) / 2;
    
        result.style.left = `${-offsetX + (thumbnailWidth / 2 - event.clientX) + thumbnailBounds.left}px`;
        result.style.top = `${-offsetY + (thumbnailHeight / 2 - event.clientY) + thumbnailBounds.top}px`;
    } else { // 현재 마우스가 사각형 범위 내에 들어있지 않다면..
        result.src = transparentPixel; // 돋보기 내부의 이미지 주소를 투명 이미지로 변경!
    }
});