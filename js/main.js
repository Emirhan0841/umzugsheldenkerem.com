async function loadPartials() {
  const nodes = Array.from(document.querySelectorAll("[data-include]"));
  await Promise.all(
    nodes.map(async (node) => {
      const url = node.getAttribute("data-include");
      if (!url) return;
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        const html = await res.text();
        node.outerHTML = html;
      } catch (err) {
        console.warn(`Include failed: ${url}`, err);
      }
    })
  );
}

function initSite() {
// Tailwind config (CDN)
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0d",
        paper: "#ffffff",
        muted: "#6b7280",
        line: "rgba(0,0,0,.10)"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.10)"
      }
    }
  }
};

// Mobile nav
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Build a mailto template (no backend yet)
const form = document.getElementById("requestForm");
const msg = document.getElementById("formMsg");

function enc(value) {
  return encodeURIComponent((value || "").trim());
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get("name");
  const phone = data.get("phone");
  const email = data.get("email");
  const from = data.get("from");
  const to = data.get("to");
  const date = data.get("date");
  const service = data.get("service");
  const details = data.get("details");

  const subject = `Anfrage: ${service || "Umzug/Transport"} – ${name || ""}`.trim();
  const body =
`Hallo Umzugshelden,

ich möchte ein Angebot anfragen.

Name: ${name || "-"}
Telefon: ${phone || "-"}
E-Mail: ${email || "-"}

Von: ${from || "-"}
Nach: ${to || "-"}
Wunschtermin: ${date || "-"}

Leistung: ${service || "-"}
Details:
${details || "-"}

Viele Grüße
${name || ""}`.trim();

  const mailto = `mailto:info@umzugshelden.de?subject=${enc(subject)}&body=${enc(body)}`;

  msg.classList.remove("hidden");
  msg.innerHTML = `
    <div class="font-medium text-ink">Fertig.</div>
    <div class="mt-1">Klicke auf den Button, um die E-Mail zu öffnen. Du kannst den Text vorher prüfen.</div>
    <a class="mt-3 inline-flex items-center justify-center rounded-2xl bg-ink px-5 py-3 text-paper shadow-soft hover:opacity-90" href="${mailto}">
      E-Mail öffnen
    </a>
  `;

  msg.scrollIntoView({ behavior: "smooth", block: "center" });
});


// Impressum modal
const openImpressum = document.getElementById("openImpressum");
const impressumModal = document.getElementById("impressumModal");
const closeImpressum = document.getElementById("closeImpressum");

function setImpressum(open) {
  if (!impressumModal) return;
  impressumModal.classList.toggle("hidden", !open);
  impressumModal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("overflow-hidden", open);
  if (open) {
    closeImpressum?.focus();
  } else {
    openImpressum?.focus();
  }
}

openImpressum?.addEventListener("click", () => setImpressum(true));
closeImpressum?.addEventListener("click", () => setImpressum(false));

impressumModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (target && target.matches("[data-modal-close]")) {
    setImpressum(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !impressumModal?.classList.contains("hidden")) {
    setImpressum(false);
  }
});


// Cookie banner
const cookieBanner = document.getElementById("cookieBanner");
const cookieAccept = document.getElementById("cookieAccept");
const cookieDecline = document.getElementById("cookieDecline");
const cookieKey = "cookieConsent";

function setCookieBanner(visible) {
  if (!cookieBanner) return;
  cookieBanner.classList.toggle("hidden", !visible);
  cookieBanner.setAttribute("aria-hidden", String(!visible));
  document.body.classList.toggle("overflow-hidden", visible);
}

if (cookieBanner) {
  const stored = localStorage.getItem(cookieKey);
  if (!stored) setCookieBanner(true);
}

cookieAccept?.addEventListener("click", () => {
  localStorage.setItem(cookieKey, "accepted");
  setCookieBanner(false);
});

cookieDecline?.addEventListener("click", () => {
  localStorage.setItem(cookieKey, "necessary");
  setCookieBanner(false);
});


// Datenschutz modal
const openDatenschutz = document.getElementById("openDatenschutz");
const datenschutzModal = document.getElementById("datenschutzModal");
const closeDatenschutz = document.getElementById("closeDatenschutz");

function setDatenschutz(open) {
  if (!datenschutzModal) return;
  datenschutzModal.classList.toggle("hidden", !open);
  datenschutzModal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("overflow-hidden", open);
  if (open) {
    closeDatenschutz?.focus();
  } else {
    openDatenschutz?.focus();
  }
}

openDatenschutz?.addEventListener("click", () => setDatenschutz(true));
closeDatenschutz?.addEventListener("click", () => setDatenschutz(false));

datenschutzModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (target && target.matches("[data-modal-close]")) {
    setDatenschutz(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !datenschutzModal?.classList.contains("hidden")) {
    setDatenschutz(false);
  }
});

}

loadPartials()
  .then(initSite)
  .catch((err) => {
    console.warn("Partial load failed", err);
    initSite();
  });
