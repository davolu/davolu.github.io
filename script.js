(() => {
  const nav = document.querySelector("#site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const headerLinks = nav ? [...nav.querySelectorAll("a[href^='#']")] : [];

  const closeNav = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const sections = ["work", "book", "writing", "help"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setCurrent = () => {
    if (!headerLinks.length) return;
    const marker = window.scrollY + 96;
    let current = null;
    for (const section of sections) {
      if (section.offsetTop <= marker) current = section.id;
    }
    headerLinks.forEach((link) => {
      const id = link.getAttribute("href").slice(1);
      if (id && id === current) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  setCurrent();
  window.addEventListener("scroll", setCurrent, { passive: true });

  const copyButton = document.querySelector(".copy-bio");
  if (copyButton) {
    const original = copyButton.textContent;
    copyButton.addEventListener("click", async () => {
      const target = document.querySelector(copyButton.dataset.copyTarget);
      const text = target ? target.innerText.trim() : "";
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        copyButton.textContent = "Copied";
        copyButton.classList.add("is-copied");
        window.setTimeout(() => {
          copyButton.textContent = original;
          copyButton.classList.remove("is-copied");
        }, 1600);
      } catch {
        copyButton.textContent = "Copy failed";
        window.setTimeout(() => {
          copyButton.textContent = original;
        }, 1600);
      }
    });
  }
})();
