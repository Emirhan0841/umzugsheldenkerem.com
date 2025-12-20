async function inject(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    el.innerHTML = await res.text();
  } catch (e) {
    console.error("Include failed:", url, e);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await inject("#siteHeader", "/partials/header.html");
  await inject("#siteFooter", "/partials/footer.html");

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  }
});
