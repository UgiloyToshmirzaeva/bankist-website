'use strict';

//////////////////////////////////////// 
// Modal window
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

const form = document.querySelector('.modal__form');
const inputs = form.querySelectorAll('input');
const labels = form.querySelectorAll('label');

inputs.forEach((input, index) => {
  input.addEventListener('input', function() {
    if (this.value !== '') {
      this.style.borderColor = '';
      labels[index].style.color = '';
    }
  });
});

form.addEventListener('submit', function(event) {
  let allFilled = true;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      inputs[i].style.borderColor = 'red';
      labels[i].style.color = 'red';
      allFilled = false;
    } else {
      inputs[i].style.borderColor = '';
      labels[i].style.color = '';
    }
  }

  if (!allFilled) {
    event.preventDefault();
  } else {
    alert('Thank you for submitting!');
  }
});






// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//SMOOTH SCROLLING --LEARN MORE

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', (e) => {
  // const s1coords = section1.getBoundingClientRect();
  // // window.scrollTo(s1coords.left + window.pageXOffset, 
  // // s1coords.top + window.pageYOffset)
  // window.scrollTo ({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // })
  section1.scrollIntoView({behavior: 'smooth'})
})

//TOGGLE RESPONSIVE HAMBURGER MENU
const hamburger = document.querySelector('.hamburger')
const navLinks = document.querySelector('.nav__links')
const hamBar = document.querySelectorAll('.bar')

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active')
  navLinks.classList.toggle('active')
})

//PAGE NAVIGATION
document.querySelectorAll('.nav__link').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const id = el.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  })

})

// document.querySelector('.nav__links').addEventListener('click', (e) => {
//   if(e.target.classList.contains('nav__link')){
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     })
//   }
// })
// document.querySelector('.nav__links').addEventListener('click', (e) => {
//   let target = e.target;
//   while (target && !target.classList.contains('nav__link')) {
//     target = target.parentElement;
//   }
  
//   if(target){
//     const id = target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     });
//   }
// });

//TABBED COMPONENT 
// const tabs = document.querySelector('.operations__tab')
// const tabsContainer = document.querySelector('.operations__tab-constainer')
// const tabsContent = document.querySelectorAll('.operations__content')

// tabsContainer.addEventListener('click', (e) => {
//   const clicked = e.target.closest('.operations__tab')
//   if(!clicked) return;
//   tabs.forEach(t => t.classlist.remove('operations__tab--active'))
//   clicked.classList.add('operations__tab--active')

//   // content area
//   document.querySelector(`.operations__constent--${clicked.dataset.tab}`).classList.add('operations__content--active')
// })


const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const tabsContainer = document.querySelector(".operations__tab-container");


tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  console.log(clicked);
  if (clicked) {
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );

    clicked.classList.add("operations__tab--active");
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});

//MENU HOVERING EVENT
 
const nav = document.querySelector('nav')
const handleHoverEvent = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
      logo.style.opacity = this;
    })
  }
}

nav.addEventListener('mouseover', handleHoverEvent.bind(0.5))

nav.addEventListener('mouseout', handleHoverEvent.bind(1))


//STICKY NAVIGATION 
const initialCoords = section1.getBoundingClientRect()
window.addEventListener('scroll', function() {
  console.log(window.scrollY);

  if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
})

///reveal sections 
const allSections = document.querySelectorAll('.section')
const revealSection   = function (entries, observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold:0.15,
})
allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add
}) 

//LAZY IMAGES
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener("load", function () {
        this.classList.remove("lazy-img");
      });
      observer.unobserve(entry.target);
    }
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -200px 0px",
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

//slider testimeonial

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

const createDots = () => {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = (dot) => {
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach((d) => d.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${dot}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", (e) => {
  console.log(e.target);


  if (e.target.matches(".dots__dot")) {
    const { slide } = e.target.dataset; 
    goToSlide(slide);
    activateDot(slide);
  }
});
const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();


