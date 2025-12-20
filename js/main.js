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
