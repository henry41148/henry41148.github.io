gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#64ffda" },
    shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#64ffda",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
  },
  retina_detect: true,
});

// Animate skill bars when scrolled into view
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkills = () => {
  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible && !bar.dataset.animated) {
      bar.style.width = bar.dataset.width + "%";
      bar.dataset.animated = true;
    }
  });
};

// Initialize animations on page load and scroll
window.addEventListener("load", animateSkills);
window.addEventListener("scroll", animateSkills);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Fade in out animation

// gsap.from(".fade-in-out", {
//   opacity: 0,
//   y: 100,
//   duration: 0.6,
//   stagger: 0.1,
//   scrollTrigger: {
//     trigger: ".hero-content",
//     start: "top 60%",
//     end: "bottom 50%",
//     toggleActions: "play reverse play reverse",
//   },
// });

// Fade in out + scramble

function scrambleText(el, chars = "x*#01", baseDuration = 0.05) {
  // Store & clear original text
  el.dataset.originalText = el.textContent;
  el.textContent = "";

  // Duration depends on text length
  const textLength = el.dataset.originalText.length;
  const dynamicDuration = 2;
  // const dynamicDuration = Math.max(0.5, textLength * baseDuration);

  // Return GSAP tween
  return gsap.to(el, {
    duration: dynamicDuration,
    scrambleText: el.dataset.originalText,
    chars: chars,
    speed: 0.3,
    ease: "none",
  });
}

const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-content",
    start: "top 60%",
    end: "bottom 50%",
    toggleActions: "play none none none",
  },
});

const elementHero = gsap.utils.toArray(".fade-in-out");

elementHero.forEach((el, index) => {
  const startTime = index * 1.5;
  // if (el.classList.contains("hero-image")) {
  //   gsap.from(el, {
  //     opacity: 0,
  //     x: -50,
  //     duration: 0.6,
  //     ease: "power1.out",
  //   });
  //   gsap.to(el, {
  //     x: 5,
  //     repeat: 3,
  //     yoyo: true,
  //     duration: 0.05,
  //     delay: 0.6,
  //   });
  // }
  if (!el.classList.contains("hero-image") && !el.classList.contains("btn")) {
    heroTl.add(scrambleText(el), startTime);
  }
  if (el.classList.contains("btn")) {
    heroTl.from(
      el,
      {
        opacity: 0,
        y: 100,
        duration: 0.6,
        stagger: 0.1,
      },
      "+=0.5"
    );
  }
});

gsap.utils.toArray(".timeline-item").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    x: 50,
    duration: 0.4,
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      end: "bottom 30%",

      toggleActions: "play reverse play reverse",
      // markers: true,
    },
  });

  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      boxShadow: "0 0 15px rgba(44, 193, 158, 0.56)",
      duration: 0.3,
    });
  });

  item.addEventListener("mouseleave", () => {
    gsap.to(item, {
      boxShadow: "0 0 0",
      backgroundColor: "rgba(52, 52, 78, 0.3)",
      duration: 0.3,
    });
  });
});

// gsap.to(".fade-in-out",{
//     opacity: 0,
//     y: -100,
//     duration: 0.6,
//     stagger: 0.1,
//     scrollTrigger:{
//         trigger: ".hero-content",
//         start: "top 60%",
//         end: "bottom 50%",
//         toggleActions: "play reverse play reverse",
//         marker: true
//     }
// })
