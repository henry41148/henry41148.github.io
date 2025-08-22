// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };
// =======================
// GSAP Plugins
// =======================
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

// =======================
// Particles.js Background
// =======================
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: "#64ffda" },
    shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
    opacity: { value: 0.5, random: true },
    size: { value: 5, random: true },
    line_linked: {
      enable: true,
      distance: 180,
      color: "#64ffda",
      opacity: 0.2,
      width: 2,
    },
    move: {
      enable: true,
      speed: 2,
      random: true,
      out_mode: "out",
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

// Create the main ScrollTrigger instance

// =======================
// Scramble Text Effect
// =======================
function scrambleText(el, chars = "x*#01", duration = 2, tweenLength = true) {
  el.dataset.originalText = el.textContent;
  el.textContent = "";

  return gsap.to(el, {
    duration,
    scrambleText: el.dataset.originalText,
    chars: chars,
    speed: 0.3,
    tweenLength,
  });
}
// =======================
// Header effect
// =======================
gsap.to("header", {
  background: "rgba(10, 25, 47, 0.41)",
  backdropFilter: "blur(20px)",
  borderBottom: "2px solid rgba(100, 255, 218, 0.1)",
  height: "75px",
  // 2. The ScrollTrigger that controls the animation
  scrollTrigger: {
    trigger: ".hero-image", // The trigger is the body of the page
    start: "top 75px", // Start the animation when you scroll 10px down
    end: "top 150px", // The animation is fully complete after scrolling 200px

    // 3. This is the magic part!
    scrub: 1, // Links the animation progress to the scrollbar (with a 1-second lag)
  },
});
// =======================
// Hero Section Timeline
// =======================


// Timeline driven by scroll - scrub so progress matches scroll
// --- SETUP ---
// Ensure all plugins are registered
gsap.registerPlugin(ScrollTrigger);
// Select your hero elements
const hero = document.querySelector(".hero");
const elementHero = gsap.utils.toArray(".fade-in-out");


// ===================================================================
//  1. ENTRANCE ANIMATION (Plays once on page load)
// ===================================================================
// We create a timeline for all the hero content to animate IN.
const heroEntranceTl = gsap.timeline({
    // We add a small delay so the user has a moment to register the page.
    delay: 0.5 
});

// Use your excellent forEach loop to build the entrance sequence
elementHero.forEach((el, index) => {
    const startTime = index * 0.4;

    if (el.classList.contains("hero-image")) {
        heroEntranceTl
            .from(el, {
                opacity: 0,
                filter: "blur(6px)",
                duration: 0.8, // Slightly longer duration for a smoother feel
            }, startTime) // Position this animation on the timeline
            
    }

    if (!el.classList.contains("hero-image") && !el.classList.contains("btn")) {
        // We add the scramble text animation to the same timeline
        heroEntranceTl.add(scrambleText(el, undefined, 2), startTime);
    }

    if (el.classList.contains("btn")) {
        heroEntranceTl.from(el, {
            opacity: 0,
            y: 100,
            duration: 0.6,
            stagger: 0.1,
        }, startTime + 0.5); // Stagger the button appearance slightly
    }
});


// ===================================================================
//  2. EXIT ANIMATION (Controlled by the scrollbar)
// ===================================================================
// This timeline will make the ENTIRE hero section fade and shrink away.
const heroExitTl = gsap.timeline({
    scrollTrigger: {
        trigger: hero, // The trigger is the hero section itself
        
        // --- The Magic Keywords for this effect ---
        pin: true,     // Pins the hero section while the animation happens
        scrub: 1,      // Links the animation directly to the scrollbar (smoothly)

        // Define the "active zone" for the scroll animation
        start: "top top", // Pinning starts when the top of the hero hits the top of the screen
        end: "+=80%",    // The user will scroll for a distance of 150% of the viewport height while it's pinned
        
        // markers: true,   // Uncomment for debugging to see the start/end triggers
    }
});

// This is the animation that happens while the hero is pinned
heroExitTl.to(hero, {
    scale: 0.8,
    opacity: 0,
    zIndex: 1,
    filter: "blur(10px)",
    ease: "power2.inOut"
}, 0);

// =======================
// About Section Timeline
// =======================

const elementAbout = gsap.utils.toArray(".scramble-about");
const elementAbout2 = gsap.utils.toArray(".scramble-about2");

const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-header",
    start: "top 85%",
    end: "bottom 50%",
    toggleActions: "play none none none",
    markers:true
  },
});

elementAbout.forEach((el, index) => {
  if (!el.classList.contains("scramble-about2")) {
    aboutTl.add(scrambleText(el, undefined, 1.5), 0);
  } else {
    aboutTl.from(
      el,
      {
        opacity: 0,
        filter: "blur(30px)",
        duration: 0.5,
        scaleX: 0.9,
        y: index * -20
      },
      index * 0.2 + 0.5
    );
  }
});

// =======================
// Header Timeline Items Animation
// =======================

const expTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".exp-header",
    start: "top 75%",
    end: "bottom 38%",
    toggleActions: "play none play none",
  },
});
const expTitle = document.querySelector(".exp-title");
expTl.add(scrambleText(expTitle, undefined, 2), 0);

const expSubTitle = document.querySelector(".exp-subtitle");
expTl.from(
  expSubTitle,
  {
    opacity: 0,
    filter: "blur(20px)",
    duration: 1,
  },
  1
);
// =======================
// Timeline Items Animation
// =======================
gsap.utils.toArray(".timeline-item").forEach((item) => {
  gsap.from(item, {
    opacity: 0,
    filter: "blur(40px)",
    duration: 0.35,
    scaleX: 0.8,
    transformOrigin: "0% 50%", // left edge as pivot
    scrollTrigger: {
      trigger: item,
      start: "top 70%",
      end: "bottom 30%",
      toggleActions: "play reverse play reverse",
    },
  });

  // Hover glow
  item.addEventListener("mouseenter", () => {
    gsap.to(item, {
      boxShadow: "0 0 25px rgba(41, 255, 205, 0.67)",
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

// =======================
// Skills Animation
// =======================

const skillTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".skill-title",
    start: "top 75%",
    end: "bottom 38%",
    toggleActions: "play none none none",
  },
});

const skillTitle = document.querySelector(".skill-title");
skillTl.add(scrambleText(skillTitle, undefined, 2), 0);

const skillSubTitle = document.querySelector(".skill-subtitle");
skillTl.from(
  skillSubTitle,
  {
    opacity: 0,
    filter: "blur(20px)",
    duration: 1,
  },
  1
);

const skillTagTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".skills-container",
    start: "top 75%",
    end: "bottom 30%",
    toggleActions: "play reverse play reverse",
  },
});
const skillTag = document.querySelectorAll(".skill-tag");
skillTag.forEach((el, index) => {
  skillTagTl.from(
    el,
    {
      y: 50,
      filter: "blur(20px)",
      opacity: 0,
      duration: 0.27,
    },
    index * 0.1
  );
});

const projectTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".project-section-title",
    start: "top 75%",
    end: "bottom 38%",
    toggleActions: "play none none none",
  },
});
const projectTitle = document.querySelector(".project-section-title");
projectTl.add(scrambleText(projectTitle, undefined, 2), 0);

const projectSubTitle = document.querySelector(".project-section-subtitle");
projectTl.from(
  projectSubTitle,
  {
    opacity: 0,
    filter: "blur(20px)",
    duration: 1,
  },
  1
);
