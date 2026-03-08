const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const form = document.querySelector(".contact-form");

if (burger) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-mode");
    if (themeIcon) themeIcon.className = "fas fa-sun";
  } else {
    document.body.classList.remove("light-mode");
    if (themeIcon) themeIcon.className = "fas fa-moon";
  }
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-mode");
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
}

function updateNavbarOnScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "var(--primary)";
    }
  });
}

function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    }
  }
}

function animateSkills() {
  const skillFills = document.querySelectorAll(".skill-fill");

  skillFills.forEach((fill) => {
    const rect = fill.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      fill.style.width = fill.getAttribute("data-width");
    }
  });
}

window.addEventListener("scroll", () => {
  updateNavbarOnScroll();
  updateActiveNav();
  reveal();
  animateSkills();
});

window.addEventListener("load", () => {
  updateNavbarOnScroll();
  updateActiveNav();
  reveal();
  animateSkills();
});

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.innerHTML = "Message Sent! ✓";
    btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";

    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.style.background = "";
      form.reset();
    }, 3000);
  });
}
