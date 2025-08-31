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

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop + 150 + window.innerHeight,
        behavior: "smooth",
      });
    }
  });
});

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
const headerA = document
  .querySelector("header")
  .querySelector("nav")
  .querySelectorAll("a");

// ===================================================================
//  1. ENTRANCE ANIMATION (Plays once on page load)
// ===================================================================
// We create a timeline for all the hero content to animate IN.
const heroEntranceTl = gsap.timeline({
  // We add a small delay so the user has a moment to register the page.
  delay: 0.5,
});

// Use your excellent forEach loop to build the entrance sequence
elementHero.forEach((el, index) => {
  const startTime = index * 0.7;

  if (el.classList.contains("hero-image")) {
    heroEntranceTl.from(
      el,
      {
        opacity: 0,
        scale: 0.9,
        filter: "blur(26px)",
        duration: 0.7, // Slightly longer duration for a smoother feel
      },
      startTime
    ); // Position this animation on the timeline
  }

  if (!el.classList.contains("hero-image") && !el.classList.contains("btn")) {
    // We add the scramble text animation to the same timeline
    heroEntranceTl.add(scrambleText(el, undefined, 2), startTime);
  }

  if (el.classList.contains("btn")) {
    heroEntranceTl.from(
      el,
      {
        opacity: 0,
        y: 100,
        duration: 0.3,
        stagger: 0.1,
      },
      startTime + 1.4
    ); // Stagger the button appearance slightly
  }
});
const total = headerA.length;
headerA.forEach((el, index) => {
  const startTime = (total - 1 - index) * 0.2;
  heroEntranceTl.from(
    el,
    {
      opacity: 0,
      y: -10,
      filter: "blur(16px)",
      duration: 0.4,
    },
    startTime + 4
  );
});
heroEntranceTl.from(
  ".logo",
  {
    opacity: 0,
    y: -10,
    duration: 0.4,
    filter: "blur(-16px)",
  },
  "-=0.5"
);
// ===================================================================
//  2. EXIT ANIMATION (Controlled by the scrollbar)
// ===================================================================
// This timeline will make the ENTIRE hero section fade and shrink away.
const heroExitTl = gsap.timeline({
  scrollTrigger: {
    trigger: hero, // The trigger is the hero section itself

    // --- The Magic Keywords for this effect ---
    pin: true, // Pins the hero section while the animation happens
    scrub: 1, // Links the animation directly to the scrollbar (smoothly)

    // Define the "active zone" for the scroll animation
    start: "top top", // Pinning starts when the top of the hero hits the top of the screen
    end: "+=90%", // The user will scroll for a distance of 150% of the viewport height while it's pinned

    // markers: true,   // Uncomment for debugging to see the start/end triggers
  },
});

// This is the animation that happens while the hero is pinned
heroExitTl.to(
  hero,
  {
    scale: 0.8,
    opacity: 0,
    zIndex: 1,
    filter: "blur(10px)",
    ease: "power2.inOut",
  },
  0
);

// =======================
// About Section Timeline
// =======================

const elementAbout = gsap.utils.toArray(".scramble-about");
const elementAbout2 = gsap.utils.toArray(".scramble-about2");

const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".about-header",
    start: "top 90%",
    end: "bottom 50%",
    toggleActions: "play none none none",
  },
});

elementAbout.forEach((el, index) => {
  if (!el.classList.contains("scramble-about2")) {
    aboutTl.add(scrambleText(el, undefined, 2), 0);
  } else {
    aboutTl.from(
      el,
      {
        opacity: 0,
        filter: "blur(30px)",
        duration: 0.5,
        scaleX: 0.9,
        y: index * -20,
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
    toggleActions: "play none none none",
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

const projects = [
  {
    title: "2D Platformer Game (Mario-inspired)",
    summary: "Developed a side-scrolling 2D platformer with classic Mario-style gameplay.",
    description:
      "A Unity-based 2D platformer featuring character controls, enemies, collectibles, and level progression.",
    image: "assets/images/project-thumbnails/2D-Platformer.png",
    video: "assets/images/project-thumbnails/2D-Platformer.mp4",
    technologies: ["Unity", "C#", "2D Physics", "Tilemap", "Animation", "Collision System"],
    liveUrl: "#",
    codeUrl: "#",
    timeline: "15 May – 1 June 2025",
    teamSize: "1 member",
    details:
      "Designed and implemented a side-scrolling platformer inspired by Super Mario, with player movement, jump mechanics, coin collection, and enemy AI. Applied Unity’s 2D physics for smooth controls and collision handling. Built multiple levels with increasing difficulty and a scoring system.\n\nTimeline: 15 May – 1 June 2025\nTeam size: 1 member."
  },
  {
    title: "3D Terrain Explorer (First-Person Controller)",
    summary: "Created a terrain demo with sculpted landscapes and a simple first-person controller.",
    description:
      "A lightweight Unity demo featuring sculpted terrain, painted materials, and first-person exploration.",
    image: "assets/images/project-thumbnails/3D-Terrain-Explorer.png",
    video: "assets/images/project-thumbnails/Terrain.mp4",
    technologies: ["Unity", "C#", "Terrain Tools", "First-Person Controller", "Lighting & Materials"],
    liveUrl: "#",
    codeUrl: "#",
    timeline: "10 July – 5 August 2025",
    teamSize: "1 member",
    details:
      "Built a terrain-focused prototype with sculpted heightmaps, textured layers, and scattered vegetation. Implemented a simple first-person controller with smooth WASD movement and mouse-look controls. Applied baked lighting for performance and added a few collectibles for interactivity.\n\nTimeline: 10 July – 5 August 2025\nTeam size: 1 member."
  },
  {
    title: "Spatio-Temporal Graph Neural Networks for Traffic Forecasting",
    summary: "Benchmarked state-of-the-art GNN architectures for traffic prediction.",
    description:
      "A research-focused project replicating and validating GNN models for large-scale traffic forecasting.",
    image: "assets/images/project-thumbnails/GNN.png",
    technologies: ["PyTorch", "Graph Neural Networks", "Python", "Machine Learning"],
    liveUrl: "#",
    codeUrl: "#",
    timeline: "Dec 2024 – Feb 2025",
    teamSize: "2 members",
    details:
      "Conducted an in-depth literature review and hands-on implementation of GNN architectures for traffic forecasting. Benchmarked models such as DDGCRN, STWave, and AGCRN on real-world traffic datasets (PeMS) using MAE, RMSE, and MAPE as evaluation metrics. Replicated and validated results, achieving comparable performance on large-scale benchmarks.\n\nTimeline: Dec 2024 – Feb 2025\nTeam size: 2 members."
  },
  {
    title: "Medical Chatbot",
    summary: "Built an LLM-powered medical assistant using a fine-tuned T5 model.",
    description:
      "A chatbot trained on 45,000+ Q&A pairs to suggest possible conditions from symptoms.",
    image: "assets/images/project-thumbnails/Chatbot.png",
    video: "assets/images/project-thumbnails/Chatbot.mp4",
    technologies: ["Python", "Transformers", "Hugging Face", "Gradio", "LLM"],
    liveUrl: "https://huggingface.co/spaces/henry41148/henry-space",
    codeUrl: "#",
    timeline: "Sep 2024 – Oct 2024",
    teamSize: "1 member",
    details:
      "Collected and structured 45,000+ doctor–patient interactions from iCliniq to build a custom dataset. Fine-tuned a T5 transformer model to map symptoms to conditions and generate natural-language answers. Deployed a live chatbot using Gradio on Hugging Face Spaces for real-time responses.\n\nTimeline: Sep 2024 – Oct 2024\nTeam size: 1 member."
  },
  {
    title: "Big Data Analytics: PCY Implementation in PySpark",
    summary: "Applied distributed computing with PySpark to find frequent itemsets in shopping data.",
    description:
      "Implementation of the PCY algorithm in PySpark for scalable analysis of frequent item pairs.",
    image: "assets/images/project-thumbnails/Bigdata.png",
    technologies: ["PySpark", "Big Data", "HDFS", "Python"],
    liveUrl: "#",
    codeUrl: "https://github.com/henry41148/BigData-PCY-Pyspark",
    timeline: "Mar 2024",
    teamSize: "5 members",
    details:
      "Analyzed shopping basket data using the PCY algorithm to identify frequent item pairs and generate association rules. Implemented a PySpark pipeline with preprocessing, hash bucket optimization, and multi-pass scanning. Leveraged distributed computing for scalable analysis, simulating real-world market basket scenarios.\n\nTimeline: Mar 2024\nTeam size: 5 members."
  },
  {
    title: "Weather and Traffic Forecasting Application",
    summary: "Built an IoT + ML Android app for real-time forecasting.",
    description:
      "Combined custom IoT hardware, ML models, and an Android app to deliver weather and traffic predictions.",
    image: "assets/images/project-thumbnails/IOT.png",
    technologies: ["IoT", "Python", "Machine Learning", "Android", "Java"],
    liveUrl: "https://youtu.be/fEdR2XuSrMw",
    codeUrl: "#",
    timeline: "Nov 2023",
    teamSize: "2 members",
    details:
      "Built a custom IoT device with environmental sensors to collect temperature, humidity, and air quality data. Preprocessed the data and applied ML models to forecast trends. Developed an Android app to visualize sensor data and provide real-time predictions.\n\nTimeline: Nov 2023\nTeam size: 2 members."
  }
];



const showcaseWrapper = document.getElementById("showcaseWrapper");
// const gridContainer = document.getElementById('gridContainer');
const showcase = document.getElementById("showcase");
const projectIndicators = document.getElementById("projectIndicators");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const modal = document.getElementById("projectModal");
const closeModalBtn = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");

let activeIndex = 0;

function shortText(str = '', maxChars = 110) {
  if (!str) return '';
  if (str.length <= maxChars) return str;
  const cut = str.slice(0, maxChars);
  return (cut.replace(/\s+\S*$/, '') || cut) + '…';
}
function createCardHTML(project) {
  // prefer explicit summary, fallback to short excerpt of description/details
  const summary = project.summary
    ? project.summary
    : shortText(project.description || project.details, 110);

  // optional: preview up to 3 tech tags on the card
  const techPreview =
    project.technologies && project.technologies.length
      ? `<div class="tech-preview">
          ${project.technologies.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>`
      : "";

// <div class="project-view-more">
//     <i class="fas fa-search-plus"></i>
//     <span>View Details</span>
//   </div>
return `
  <div class="project-media">
    ${project.video 
      ? `<video class="project-video" src="${project.video}" autoplay muted loop playsinline></video>` 
      : `<img class="project-image" src="${project.image}" alt="${project.title}">`}
  </div>
  <div class="project-content">
    <h3 class="project-title">${project.title}</h3>

    ${techPreview}

    <!-- subtle hover notice -->
    <div class="view-more-notice" aria-hidden="true">Click to explore details →</div>
  </div>
`;

    
}


function init() {
  showcase.innerHTML = "";
  //  gridContainer.innerHTML = '';
  projectIndicators.innerHTML = "";

  projects.forEach((project, index) => {
    // Showcase Card
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = createCardHTML(project);
    card.addEventListener("click", () => handleCardClick(index));
    showcase.appendChild(card);

    // Indicator
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    indicator.addEventListener("click", () => updateActive(index));
    projectIndicators.appendChild(indicator);
  });
  updateShowcase();
}
function updateShowcase() {
  const cards = document.querySelectorAll(".project-card");
  const indicators = document.querySelectorAll(".indicator");
  const offset = 35;
  const rotation = 30;
  const scale = 0.8;

  cards.forEach((card, index) => {
    const position = index - activeIndex;
    let transform;

    const video = card.querySelector("video");

    if (position === 0) {
      // Active
      transform = `translateX(0) rotateY(0) scale(1)`;
      card.style.filter = 'none';

      // Try to play video if present
      if (video) {
        video.muted = true;         // ensure autoplay isn’t blocked
        video.playsInline = true;   // iOS inline
        video.play().catch(()=>{});
      }
    } else {
      // Non-active
      const sign = Math.sign(position);
      transform = `translateX(${position * offset + sign * 30}%) rotateY(${-sign * rotation}deg) scale(${scale})`;
      card.style.filter = `brightness(0.5) saturate(0.8) blur(${Math.abs(position) * 0.5}px)`;

      // Pause video if present
      if (video) video.pause();
    }

    card.style.setProperty("--transform-base", transform);
    card.style.transform = `translate(-50%, -50%) var(--transform-base)`;
    
    card.style.opacity = Math.abs(position) > 2 ? "0" : "1";
    card.style.zIndex = projects.length - Math.abs(position);
    card.classList.toggle("active", index === activeIndex);
  });

  indicators.forEach((ind, index) => {
    ind.classList.toggle("active", index === activeIndex);
  });
}

function updateActive(newIndex, isForced = false) {
  if (!isForced && newIndex === activeIndex) return;
  activeIndex = (newIndex + projects.length) % projects.length;
  updateShowcase();
}

function handleCardClick(index) {
  if (index === activeIndex) {
    showProjectModal(index);
  } else {
    updateActive(index);
  }
}
function showProjectModal(index) {
  const project = projects[index];
  modalBody.innerHTML = `
    <div class="modal-media">
      ${project.video 
        ? `<video class="modal-video" src="${project.video}" controls autoplay muted playsinline></video>` 
        : `<img class="modal-image" src="${project.image}" alt="${project.title}">`}
    </div>
    <h2 class="modal-title">${project.title}</h2>
    <div class="modal-meta">
      <p><strong>Timeline:</strong> ${project.timeline}</p>
      <p><strong>Team Size:</strong> ${project.teamSize}</p>
    </div>
    <p class="modal-description">${project.details}</p>

    

    <div class="modal-tech">
      ${project.technologies
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("")}
    </div>
    <div class="modal-links">
      <a href="${project.liveUrl}" class="project-link" target="_blank">
        <i class="fas fa-external-link-alt"></i> View Live Demo
      </a>
      <a href="${project.codeUrl}" class="project-link" target="_blank">
        <i class="fab fa-github"></i> View Source Code
      </a>
    </div>`;
  modal.classList.add("active");
}


function closeModal() {
  modal.classList.remove("active");
}

// Event Listeners
prevBtn.addEventListener("click", () => updateActive(activeIndex - 1));
nextBtn.addEventListener("click", () => updateActive(activeIndex + 1));

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => e.target === modal && closeModal());

document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("active")) {
    if (e.key === "Escape") closeModal();
    return;
  }
  if (e.key === "ArrowLeft") updateActive(activeIndex - 1);
  if (e.key === "ArrowRight") updateActive(activeIndex + 1);
});

init();
(function ensureModalIsGlobal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return; // nothing to do

  // Move modal under document.body so fixed covers viewport reliably
  if (modal.parentElement !== document.body) {
    document.body.appendChild(modal);
  }

  const closeBtn = document.getElementById('closeModal') || modal.querySelector('.close-modal');

  // When modal opens, lock page scroll; when it closes, restore
  const openModalHooks = () => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };
  const closeModalHooks = () => {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  // wrap existing showProjectModal & closeModal if they exist, otherwise keep your functions
  const originalShow = window.showProjectModal;
  window.showProjectModal = function (index) {
    // call your existing function that fills modal content (if defined)
    if (typeof originalShow === 'function') {
      originalShow(index);
    } else {
      // fallback: you already have a function named showProjectModal in your script,
      // so this branch should rarely run.
    }
    // show overlay + lock scroll
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
    openModalHooks();
    // ensure focus is inside modal for accessibility
    setTimeout(()=> {
      const focusTarget = modal.querySelector('button, a, [tabindex]') || modal.querySelector('.modal-content');
      focusTarget && focusTarget.focus && focusTarget.focus();
    }, 80);
  };

  // override close to unlock scroll
  const originalClose = window.closeModal;
  window.closeModal = function () {
    // if you had custom logic, run it
    if (typeof originalClose === 'function') originalClose();
    // hide overlay + release scroll
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
    closeModalHooks();
  };

  // wire close UI if not already wired
  if (closeBtn) closeBtn.addEventListener('click', ()=> window.closeModal());
  modal.addEventListener('click', (e) => { if (e.target === modal) window.closeModal(); });

  // escape key to close
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) window.closeModal(); });
})();

// ... existing code ...

// =======================
// Project Animation
// =======================
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

// =======================
// Project Cards Animation
// =======================
const projectCardsTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".showcase-container",
    start: "top 75%",
    end: "bottom 30%",
    toggleActions: "play none none none",
  },
});

// Animate project cards with stagger effect
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card, index) => {
  projectCardsTl.from(
    card,
    {
      opacity: 0,
      x: -30*index,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.out",
    },
    index * 0.15 // Stagger each card by 0.15 seconds
  );
});
