
// 전역변수를 회피하는 방법: 즉시실행함수, 밖에서 접근할수 없음 y? js에서 변수는 함수단위로 작동한다

(function() {

  const houseElem = document.querySelector('.house');
  const progressElem = document.querySelector('.progress-bar')
  const mousePos = { x:0, y:0};
  const stageElem = document.querySelector('.stage');
  const selectCharacterElem = document.querySelector('.select-character');
  let maxScrollValue = 0;

  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener('scroll', function() {
    // console.log("document.body.offsetHeight: ", document.body.offsetHeight)
    // console.log("pageYOffset/maxScrollValue: ", pageYOffset/maxScrollValue);
    // console.log(maxScrollValue);
    const scrollPer = pageYOffset/maxScrollValue;
    const zMove = scrollPer* 950 - 490;
    houseElem.style.transform = 'translateZ(' +zMove + 'vw)';
    progressElem.style.width = pageYOffset/maxScrollValue*100+'%';

  });

  window.addEventListener('mousemove', function(e) {
    // console.log(e.clientX, e.clientY);
    mousePos.x = -1 + (e.clientX / window.innerWidth)*2;
    mousePos.y = 1 - (e.clientY / window.innerHeight)*2;
    // console.log(mousePos);
    stageElem.style.transform = 'rotateX('+mousePos.y*5+'deg) rotateY('+mousePos.x*5+'deg)';
  });

  window.addEventListener('resize', resizeHandler);

  stageElem.addEventListener('click', function(e) {
    // const characterElem = document.querySelector('.character');
    // characterElem.style.left = e.clientX/window.innerWidth*100+'%';
    new Character({
      xPos: e.clientX/window.innerWidth*100,
      speed: Math.random() *0.2 + 0.2
    });

  })

  selectCharacterElem.addEventListener('click', function(e) {
    const value = e.target.getAttribute('data-char');
    
    document.body.setAttribute('data-char', value);
  })
  resizeHandler();

})();
