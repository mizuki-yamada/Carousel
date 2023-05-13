"use strict";

{
  const next = document.getElementById("next");
  const prev = document.getElementById("prev");
  const ul = document.querySelector("ul");
  const slides = ul.children;
  const dots = [];
  let currentIndex = 0;

  function updateButtons() {
    //   最初の画像と最後の画像の時、矢印を消すようにhiddenクラスをつける
    next.classList.remove("hidden");
      prev.classList.remove("hidden");
    if (currentIndex === 0) {
      prev.classList.add("hidden");
    }
    if (currentIndex === slides.length - 1) {
      next.classList.add("hidden");
    }
  }

    function moveSlides() {
      //画像の横幅だけスライドさせる
      const slideWidth = slides[0].getBoundingClientRect().width; //要素の寸法と、そのビューポートに対する相対位置に関する情報を返すメソッドで、widthのみを取ってくる
      ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
    }

    function setupDots() {
      //画像下のボタンを配置する
    //画像の数だけボタンを作りたいので、htmlではなくjsで実装
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement("button");
      button.addEventListener("click", () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
      });
      dots.push(button);
      document.querySelector("nav").appendChild(button);
    }

    dots[0].classList.add("current");
  }

    function updateDots() {
      //currentクラスの移動
    dots.forEach((dot) => {
      dot.classList.remove("current");
    });
    dots[currentIndex].classList.add("current");
  }

  setupDots();
  updateButtons();//リロード時に必要

  next.addEventListener("click", () => {
    currentIndex++;
    updateButtons();
    updateDots();
    moveSlides();
  });

  prev.addEventListener("click", () => {
    currentIndex--;
    updateButtons();
    updateDots();
    moveSlides();
  });

  window.addEventListener("resize", () => {
    moveSlides();
  });
}
