$(document).ready(function () {
  //실시간 검색 (header_키워드 )
    let keywordContainer = $("#keywordList"),
        keywordItems = keywordContainer.find("li"),
        keywordCount = keywordItems.length,
        keywordOldIdx = 0,
        keywordIdx = 0,
        keywordInterval = 3000,
        keywordTimer;

    // **초기 상태 설정 (첫 번째 키워드만 보이기)**
    keywordItems.hide().eq(0).show();

    // **자동 롤링 함수**
    function keywordAuto() {
        keywordTimer = setInterval(function () {
            keywordIdx = (keywordOldIdx + 1) % keywordCount;
            keywordItems.eq(keywordOldIdx).fadeOut(300);
            keywordItems.eq(keywordIdx).fadeIn(300);
            keywordOldIdx = keywordIdx;
        }, keywordInterval);
    }

    keywordAuto(); // 자동 롤링 시작

    // **마우스 오버 시 전체 리스트 보이기**
    $(".keyword").mouseenter(function () {
        clearInterval(keywordTimer); 
        keywordItems.stop(true, true).fadeIn(300); 
    });

    // **마우스 아웃 시 다시 첫 번째 키워드만 보이기**
    $(".keyword").mouseleave(function () {
        keywordItems.stop(true, true).fadeOut(300, function () {
            keywordItems.eq(keywordOldIdx).fadeIn(300); 
        });
        keywordAuto(); // 다시 롤링 시작
    });
});

//상단의 side-manu - hidden
$(document).ready(function() {
  $(".logo").hover(function() {
    $(this).find(".menu-list").stop().slideDown(200); 
  }, function() {
    $(this).find(".menu-list").stop().slideUp(200); 
  });
});


// 상단 메뉴  (header_gnb)
$(document).ready(function() {
  $(".main").hover(function() {
    $(this).find(".sub").stop().slideDown(200); 
  }, function() {
    $(this).find(".sub").stop().slideUp(200); 
  });

  
  //이벤트
  let eventContainer = $(".fade"),
  eventImage = eventContainer.find(".fade-items ul li"),
  eventIndicator = eventContainer.find(".fade-indicator a"),
  eventPrev = eventContainer.find(".fade-side .prev"),
  eventNext = eventContainer.find(".fade-side .next"),
  eventOldIdx = 0,  
  eventIdx = 0,  
  eventCount = eventImage.length, 
  eventInterval = 3000;

  function eventAni(eventIdx){  
    eventIndicator.removeClass("active");
    eventIndicator.eq(eventIdx).addClass("active");
    eventImage.stop().fadeOut("300");
    eventImage.eq(eventIdx).stop().fadeIn("300");
    eventOldIdx = eventIdx; 
  };


function eventAuto() {
eventTimer = setInterval(function(){
  eventIdx = (eventOldIdx + 1) % eventCount;
  eventAni(eventIdx);  
}, eventInterval);
};
eventAuto();

//Indicator(하단버튼)
eventIndicator.click(function(){
eventIdx = $(this).index();
eventAni(eventIdx);
});

//좌우버튼
eventPrev.click(function(){
eventIdx--;
if (eventIdx < 0) { 
  eventIdx = eventCount - 1;  
}
eventAni(eventIdx);
});
eventNext.click(function(){
eventIdx++;
if (eventIdx > eventCount - 1) { 
  eventIdx = 0;  
}
eventAni(eventIdx);
});

eventContainer.mouseenter(function(){
clearInterval(eventTimer);
})
.mouseleave(function(){
eventAuto();
});

//main 이미지 및 우측 순위 표현 

let fadeContainer = $("main"),
    fadeImage = fadeContainer.find(".main-cotainer .main-img"),
    fadeIndicator = fadeContainer.find(".top-indicator .car .ind"),
    oldidx = 0,  
    idx = 0,  
    fadeCount = fadeImage.length, 
    interval = 4000;  

// 이미지와 버튼이 바뀌는 함수
function fadeAni(idx) {
    if (oldidx !== idx) {  

        fadeIndicator.eq(oldidx).removeClass("active");
        fadeIndicator.eq(idx).addClass("active");
        fadeImage.eq(oldidx).stop().fadeOut(300);
        fadeImage.eq(idx).stop().fadeIn(300);
    }

    // 기존 인덱스를 새 인덱스로 업데이트
    oldidx = idx;
};

// 자동 페이드 함수
function fadeAuto() {
    fadeTimer = setInterval(function () {
        idx = (oldidx + 1) % fadeCount;  
        fadeAni(idx);  
    }, interval);
}

fadeAuto();  // 자동 페이드 시작

// 하단 버튼 클릭 시, 해당 이미지로 전환
fadeIndicator.click(function () {
    idx = $(this).index();  
    fadeAni(idx); 

    // 클릭 시 자동 페이드 멈춤
    clearInterval(fadeTimer);
    
    // 다시 자동 페이드 시작 (다시 자동으로 돌아가기)
    fadeAuto();
});

//마우스 오버 멈춤
fadeContainer.mouseenter(function(){
  clearInterval(fadeAni);
})
.mouseleave(function(){
  fadeAni = setInterval(slideLeft, 4000);
})

});

//recommend 추천
document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.querySelector(".recommend-side .next");
  const prevBtn = document.querySelector(".recommend-side .prev");
  const allImages = document.querySelectorAll(".recommend-list img");
  let isExpanded = false; 

  // 초기 상태: 처음 4개만 보이게 설정
  allImages.forEach((img, index) => {
    img.style.display = index < 4 ? "inline-block" : "none";
  });

  // next 버튼 클릭 시 앞 4개 사라지고 뒤 4개 보이기
  nextBtn.addEventListener("click", function () {
    if (!isExpanded) {
      allImages.forEach((img, index) => {
        img.style.display = index >= 4 ? "inline-block" : "none";
      });
      isExpanded = true; 
    }
  });

  // prev 버튼 클릭 시 다시 처음 4개만 보이기
  prevBtn.addEventListener("click", function () {
    if (isExpanded) {
      allImages.forEach((img, index) => {
        img.style.display = index < 4 ? "inline-block" : "none";
      });
      isExpanded = false; 
    }
  });

// list-container 애니메이션 설정
  $(document).ready(function(){
    let cloneElement = $(".container ul").clone();
    $(".container").append(cloneElement);
  });
  
  //마우스 오버 멈춤
  $(".container").on("mouseenter", function () {
    $(".container ul").css("animation-play-state", "paused");
  });
  $(".container").on("mouseleave", function () {
    $(".container ul").css("animation-play-state", "running");
  });

});
