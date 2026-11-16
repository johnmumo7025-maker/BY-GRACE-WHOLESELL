// Edit business details here so the name, contact links, and messages stay consistent.
const BUSINESS = {
  name: "By Grace Wholesaler",
  owner: "Martha Nathan",
  phoneDisplay: "+254 724 040 629",
  phoneInternational: "+254724040629",
  whatsappNumber: "254724040629",
  location: "Thokoa Town, Mwingi West, Kitui County, Kenya"
};

// Edit this list to update the shop's featured product categories.
const PRODUCTS = [
  { icon: "🌾", name: "Cereals & Grains", description: "Grains and pantry staples for homes, shops and kitchens." },
  { icon: "🫗", name: "Cooking Oil & Flour", description: "Everyday cooking essentials for your next big shop." },
  { icon: "🧂", name: "Sugar & Salt", description: "The basics every household and business needs." },
  { icon: "🧼", name: "Soap & Detergents", description: "Cleaning and laundry essentials for daily use." },
  { icon: "🥤", name: "Beverages & Soft Drinks", description: "Refreshments for shops, events and family tables." },
  { icon: "🏠", name: "Household Items", description: "Useful everyday goods to keep your home running." }
];

const whatsappUrl = (message) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-business-name]").forEach((element) => {
  element.textContent = BUSINESS.name;
});
document.querySelectorAll("[data-owner-name]").forEach((element) => {
  element.textContent = BUSINESS.owner;
});
document.querySelectorAll("[data-phone-link]").forEach((element) => {
  element.href = `tel:${BUSINESS.phoneInternational}`;
});
document.querySelectorAll("[data-phone-display]").forEach((element) => {
  element.textContent = BUSINESS.phoneDisplay;
});
document.querySelectorAll("[data-whatsapp-link]").forEach((element) => {
  element.href = whatsappUrl(`Hello ${BUSINESS.name}, I'd like to make an enquiry.`);
  element.setAttribute("aria-label", `Chat with ${BUSINESS.name} on WhatsApp`);
});
document.querySelector(".brand").setAttribute("aria-label", `${BUSINESS.name} home`);
const locationElement = document.querySelector("[data-location]");
if (locationElement) {
  locationElement.textContent = BUSINESS.location;
}
document.querySelector(".map-frame iframe").src =
  `https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS.location)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
document.title = `${BUSINESS.name} | Wholesale Shop in Thokoa, Mwingi, Kitui`;
document.querySelector('meta[name="description"]').content =
  `Find quality goods at wholesale prices from ${BUSINESS.name} in Thokoa, Mwingi West and Kitui County.`;
document.querySelector('meta[name="keywords"]').content =
  `${BUSINESS.name}, wholesale shop Thokoa Mwingi Kitui, bulk goods, wholesale Kenya`;
document.querySelector('meta[property="og:title"]').content =
  `${BUSINESS.name} | Wholesale Shop in Thokoa, Mwingi, Kitui`;
document.querySelector('meta[property="og:description"]').content =
  `Quality goods at wholesale prices from ${BUSINESS.name}. Serving retailers, hotels, schools and households in Kitui County.`;

const productGrid = document.querySelector("#product-grid");
PRODUCTS.forEach((product) => {
  const card = document.createElement("article");
  card.className = "product-card reveal";

  const icon = document.createElement("span");
  icon.className = "product-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = product.icon;

  const title = document.createElement("h3");
  title.textContent = product.name;
  const description = document.createElement("p");
  description.textContent = product.description;
  const askLink = document.createElement("a");
  askLink.className = "ask-link";
  askLink.href = whatsappUrl(`Hello ${BUSINESS.name}, please share your prices and availability for ${product.name}.`);
  askLink.target = "_blank";
  askLink.rel = "noopener noreferrer";
  askLink.setAttribute("aria-label", `Ask ${BUSINESS.name} for ${product.name} prices on WhatsApp`);
  askLink.append(document.createTextNode("Ask for price "));
  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "→";
  askLink.append(arrow);

  card.append(icon, title, description, askLink);
  productGrid.append(card);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  }
});

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const phone = formData.get("phone").toString().trim();
  const message = formData.get("message").toString().trim();
  const lines = [
    `Hello ${BUSINESS.name},`,
    `My name is ${name}.`,
    phone ? `My phone number is ${phone}.` : "",
    message
  ].filter(Boolean);

  window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
