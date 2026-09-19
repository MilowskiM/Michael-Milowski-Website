const content = window.PORTFOLIO_CONTENT;
document.title = content.person.siteTitle;
document.querySelector('meta[name="description"]').setAttribute("content", content.person.siteDescription);

const icon = (name) => {
  const paths = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    download: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',
    mail: '<path d="M3 5h18v14H3zM3 6l9 7 9-7"/>',
    linkedin: '<path d="M6 9v12M6 5v.01M10 21V9m0 5c1-3 8-4 8 2v5"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
};

const linkButton = (label, href, className = "button", download = false) =>
  `<a class="${className}" href="${href}" ${download ? "download" : ""}>${label}${icon(download ? "download" : "arrow")}</a>`;

function renderNavigation() {
  document.getElementById("brand-name").textContent = content.person.name;
  document.getElementById("site-nav").innerHTML = content.navigation
    .map((item, index) => `<a href="#${item.route}" data-route="${item.route}" style="--i:${index}">${item.label}</a>`)
    .join("");
}

function renderHome() {
  const featuredProject = content.projects[0];
  const featuredExperience = content.experiences[0];
  document.getElementById("home").innerHTML = `
    <div class="hero page-shell">
      <div class="hero-copy reveal">
        <p class="eyebrow">${content.person.heroEyebrow}</p>
        <h1 id="home-title">${content.person.heroTitle}</h1>
        <p class="hero-intro">${content.person.heroIntro}</p>
        <div class="hero-actions">
          ${linkButton(content.home.portfolioButton, "#portfolio")}
          ${linkButton(content.home.resumeButton, content.resume.primaryDownload, "text-link", true)}
        </div>
      </div>
      <div class="orbit-stage reveal" aria-label="Abstract orbital graphic">
        <div class="planet"><span></span></div>
        <div class="orbit-line orbit-one"></div>
        <div class="orbit-line orbit-two"></div>
        <p>${content.person.currentFocus}</p>
      </div>
    </div>
    <div class="home-grid page-shell">
      <article class="home-feature dark-card reveal">
        <div class="feature-number">01</div>
        <div>
          <p class="eyebrow">${content.home.experienceLabel}</p>
          <h2>${featuredExperience.organization}</h2>
          <p>${featuredExperience.summary}</p>
          ${linkButton(content.home.experienceButton, "#experience", "text-link")}
        </div>
      </article>
      <article class="home-feature project-feature reveal">
        <img src="${featuredProject.poster}" alt="${featuredProject.imageAlt}" />
        <div class="project-feature-overlay">
          <p class="eyebrow">${content.home.selectedWorkLabel}</p>
          <h2>${featuredProject.title}</h2>
          <p>${featuredProject.meta}</p>
        </div>
      </article>
    </div>`;
}

function renderExperience() {
  document.getElementById("experience").innerHTML = `
    <div class="page-heading page-shell reveal">
      <p class="eyebrow">${content.pageCopy.experienceEyebrow}</p>
      <h1 id="experience-title">${content.pageCopy.experienceTitle}</h1>
      <p>${content.pageCopy.experienceIntro}</p>
    </div>
    <div class="experience-list page-shell">
      ${content.experiences.map((item, index) => `
        <article class="experience-card reveal">
          <div class="experience-media"><img src="${item.image}" alt="${item.imageAlt}" loading="lazy" /></div>
          <div class="experience-copy">
            <div class="experience-topline"><span>${String(index + 1).padStart(2, "0")}</span><span>${item.accent}</span></div>
            <h2>${item.organization}</h2>
            <p class="role">${item.role}</p>
            <p class="date">${item.date}</p>
            <p class="summary">${item.summary}</p>
            <ul>${item.details.map(detail => `<li>${detail}</li>`).join("")}</ul>
          </div>
        </article>`).join("")}
    </div>`;
}

function mediaMarkup(project) {
  if (project.mediaType === "video") {
    return `<video controls muted playsinline preload="metadata" poster="${project.poster}">
      <source src="${project.media}" type="video/mp4" />
      <source src="${project.fallbackMedia}" type="video/x-msvideo" />
      ${content.pageCopy.videoFallback}
    </video>`;
  }
  if (project.mediaType === "gallery") {
    return `<div class="media-gallery">${project.media.map(image => `<img src="${image.src}" alt="${image.alt}" loading="lazy" />`).join("")}</div>`;
  }
  return `<img src="${project.media}" alt="${project.imageAlt}" loading="lazy" />`;
}

function renderPortfolio() {
  document.getElementById("portfolio").innerHTML = `
    <div class="page-heading page-shell reveal">
      <p class="eyebrow">${content.pageCopy.portfolioEyebrow}</p>
      <h1 id="portfolio-title">${content.pageCopy.portfolioTitle}</h1>
      <p>${content.pageCopy.portfolioIntro}</p>
    </div>
    <div class="project-list page-shell">
      ${content.projects.map((project, index) => `
        <article class="project-card reveal">
          <div class="project-media">${mediaMarkup(project)}</div>
          <div class="project-copy">
            <p class="project-index">${content.pageCopy.projectPrefix} / ${String(index + 1).padStart(2, "0")}</p>
            <h2>${project.title}</h2>
            <p class="project-meta">${project.meta}</p>
            <p>${project.description}</p>
            <p class="impact">${project.impact}</p>
          </div>
        </article>`).join("")}
    </div>`;
}

function renderResume() {
  const r = content.resume;
  document.getElementById("resume").innerHTML = `
    <div class="resume-hero page-shell reveal">
      <div><p class="eyebrow">${content.pageCopy.resumeEyebrow}</p><h1 id="resume-title">${r.title}</h1><p>${r.intro}</p></div>
      <div class="download-stack">
        ${linkButton(r.primaryDownloadLabel, r.primaryDownload, "button", true)}
        ${linkButton(r.federalDownloadLabel, r.federalDownload, "button secondary", true)}
      </div>
    </div>
    <div class="resume-layout page-shell">
      <aside class="resume-sidebar reveal">
        <section><p class="resume-label">${content.pageCopy.educationLabel}</p><h2>${r.education.school}</h2><p>${r.education.degree}</p><p>${r.education.date}</p><p>${r.education.detail}</p></section>
        <section><p class="resume-label">${content.pageCopy.toolkitLabel}</p>${r.skillGroups.map(group => `<div class="skill-group"><h3>${group.label}</h3><p>${group.items}</p></div>`).join("")}</section>
      </aside>
      <div class="resume-main reveal">
        <section><p class="resume-label">${content.pageCopy.resumeExperienceLabel}</p>${r.experienceItems.map(item => `<article class="resume-item"><div><h2>${item.role}</h2><p>${item.organization}</p></div><time>${item.date}</time><p>${item.detail}</p></article>`).join("")}</section>
        <section class="awards"><p class="resume-label">${content.pageCopy.recognitionLabel}</p><ul>${r.awards.map(item => `<li>${item}</li>`).join("")}</ul></section>
      </div>
    </div>`;
}

function renderAbout() {
  document.getElementById("about").innerHTML = `
    <div class="about-layout page-shell">
      <div class="portrait-placeholder reveal" role="img" aria-label="Reserved space for a future portrait">
        <div class="portrait-initials">MM</div><p>${content.person.aboutPhotoNote}</p>
      </div>
      <div class="about-copy reveal">
        <p class="eyebrow">${content.pageCopy.aboutEyebrow}</p>
        <h1 id="about-title">${content.person.aboutTitle}</h1>
        ${content.person.aboutParagraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
        <dl class="quick-facts">
          <div><dt>${content.pageCopy.studyingLabel}</dt><dd>${content.person.graduation}</dd></div>
          <div><dt>${content.pageCopy.basedAtLabel}</dt><dd>${content.person.location}</dd></div>
          <div><dt>${content.pageCopy.reachMeLabel}</dt><dd><a href="mailto:${content.person.email}">${content.person.email}</a></dd></div>
        </dl>
      </div>
    </div>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  document.getElementById("site-footer").innerHTML = `
    <div class="footer-inner page-shell">
      <div><p>${content.footer.prompt}</p><a href="mailto:${content.person.email}">${content.footer.contactLabel}${icon("arrow")}</a></div>
      <div class="footer-links"><a href="${content.person.linkedin}" target="_blank" rel="noreferrer">LinkedIn${icon("linkedin")}</a><a href="mailto:${content.person.email}">Email${icon("mail")}</a></div>
      <p class="copyright">© ${year} ${content.person.name}. ${content.footer.copyright}.</p>
    </div>`;
}

function showRoute(route, pushHash = true) {
  const validRoute = content.navigation.some(item => item.route === route) ? route : "home";
  document.querySelectorAll(".view").forEach(view => {
    const active = view.id === validRoute;
    view.hidden = !active;
    view.classList.toggle("active", active);
  });
  document.querySelectorAll("[data-route]").forEach(link => {
    const active = link.dataset.route === validRoute;
    link.classList.toggle("active", active);
    if (link.closest("nav")) active ? link.setAttribute("aria-current", "page") : link.removeAttribute("aria-current");
  });
  if (pushHash && location.hash !== `#${validRoute}`) history.pushState(null, "", `#${validRoute}`);
  document.querySelector(".menu-button").setAttribute("aria-expanded", "false");
  document.getElementById("site-nav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "auto" });
  requestAnimationFrame(observeReveals);
}

function observeReveals() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".view.active .reveal:not(.visible)").forEach(element => observer.observe(element));
}

renderNavigation();
renderHome();
renderExperience();
renderPortfolio();
renderResume();
renderAbout();
renderFooter();

document.addEventListener("click", event => {
  const routeLink = event.target.closest("a[href^='#']");
  const route = routeLink?.getAttribute("href").slice(1);
  if (routeLink && content.navigation.some(item => item.route === route)) {
    event.preventDefault();
    showRoute(route);
  }
});

document.querySelector(".menu-button").addEventListener("click", event => {
  const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
  event.currentTarget.setAttribute("aria-expanded", String(!expanded));
  document.getElementById("site-nav").classList.toggle("open", !expanded);
});

window.addEventListener("popstate", () => showRoute(location.hash.slice(1), false));
showRoute(location.hash.slice(1) || "home", false);
