// Variable

const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");
const navCenter = document.querySelector(".nav-center");
const navHeader = document.querySelector(".nav-header");
const scrollLinks = document.querySelectorAll(".scroll-link");
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

// Navbar show on click

navToggle.addEventListener("click", function () {
  navCenter.classList.toggle("nav-show");

  navHeader.classList.toggle("nav-show");

  linksContainer.classList.toggle("links-show");

  const containerHeight = linksContainer.getBoundingClientRect();

  const linksHeight = links.getBoundingClientRect().height;

  const scrollHeight = window.scrollY;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

//Floating navbar function

window.addEventListener("scroll", function () {
  const scrollHeight = window.scrollY;
  const navHeight = navbar.getBoundingClientRect().height;

  const imgWhite = document.querySelector(".logowhite");
  const imgBlack = document.querySelector(".logoblack");

  if (scrollHeight > navHeight) {
    navCenter.classList.add("fixed-navbar");
    links.classList.add("links-black");
    imgWhite.style.display = "none";
    imgBlack.style.display = "flex";
    navToggle.style.color = "#000";
  } else {
    navCenter.classList.remove("fixed-navbar");
    links.classList.remove("links-black");
    imgWhite.style.display = "flex";
    imgBlack.style.display = "none";
    navToggle.style.color = "#fafafa";
  }
  if (scrollHeight > 80) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-navbar");
    let position = element.offsetTop - navHeight;

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.classList.toggle("links-show");
  });
});

// Show section functions (animations)

const windowBottom = window.innerHeight - 30;
const sections = document.querySelectorAll(".section-container");
const aboutPhoto = document.querySelector(".right-photo");
window.addEventListener("scroll", function () {
  sections.forEach(function (section) {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= windowBottom) {
      section.classList.add("show");
    } else {
      section.classList.remove("show");
    }
  });
});

//About section photo animation

const aboutSection = document.getElementById("about");

window.addEventListener("scroll", function () {
  const aboutTop = aboutSection.getBoundingClientRect().top;

  if (aboutTop <= windowBottom) {
    aboutPhoto.classList.add("animation-photo");
  } else {
    aboutPhoto.classList.remove("animation-photo");
  }
});

//Offers swiper function

const swiper = document.querySelector(".swiper-wrapper");
firstElement = swiper.querySelectorAll(".swiper-slide")[0];
const wrapperBtns = document.querySelectorAll(".swipe-buttons button");

let isDragStart = false,
  prevPageX,
  prevScrollLeft;
let firstElementWidth = firstElement.getBoundingClientRect().width + 15;
let scrollWidth = swiper.scrollWidth - swiper.clientWidth;

wrapperBtns.forEach((icon) => {
  icon.addEventListener("click", () => {
    swiper.scrollLeft +=
      icon.id == "left" ? -firstElementWidth : firstElementWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const showHideIcons = () => {
  wrapperBtns[0].style.color = swiper.scrollLeft == 0 ? "transparent" : "#333";
  wrapperBtns[1].style.color =
    swiper.scrollLeft == scrollWidth ? "transparent" : "#333";
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = swiper.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  swiper.classList.add("dragging");
  let positionDiff = e.pageX - prevPageX;
  swiper.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  swiper.classList.remove("dragging");
};

swiper.addEventListener("mousemove", dragging);
swiper.addEventListener("mousedown", dragStart);
swiper.addEventListener("mouseup", dragStop);
swiper.addEventListener("mouseleave", dragStop);

//Photo carousel functions

let nextCarousel = document.getElementById("next");
let prevCarousel = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let listItem = document.querySelector(".carousel .list");
let thumbnail = document.querySelector(".carousel .thumbnail");
let timeRuning = 3000;
let runTimeOut;
let timeAutoNext = 7000;
let runAutoRun = setTimeout(() => {
  nextCarousel.click();
}, timeAutoNext);

prevCarousel.onclick = function () {
  showSlider("prev");
};

nextCarousel.onclick = function () {
  showSlider("next");
};
function showSlider(type) {
  let itemSlider = document.querySelectorAll(".carousel .list .item");
  let itemThumbnail = document.querySelectorAll(".carousel .thumbnail .item");

  if (type === "next") {
    listItem.appendChild(itemSlider[0]);
    thumbnail.appendChild(itemThumbnail[0]);
    carousel.classList.add("next");
  } else {
    let positionLastItem = itemSlider.length - 1;
    listItem.prepend(itemSlider[positionLastItem]);
    thumbnail.prepend(itemThumbnail[positionLastItem]);
    carousel.classList.add("prev");
  }

  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carousel.classList.remove("next");
    carousel.classList.remove("prev");
  }, timeRuning);

  clearTimeout(runAutoRun);
  runAutoRun = setTimeout(() => {
    nextCarousel.click();
  }, timeAutoNext);
}
