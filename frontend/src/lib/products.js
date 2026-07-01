import { siteConfig } from "@/data/mock";

export function getProductImages(product) {
  if (!product) return [];

  const gallery = Array.isArray(product.image_urls)
    ? product.image_urls.filter(Boolean)
    : [];

  if (gallery.length > 0) return gallery;
  if (product.image_url) return [product.image_url];
  return [];
}

export function getProductCoverImage(product, fallback = "/images/placeholder.jpg") {
  return getProductImages(product)[0] || fallback;
}

export function getProductUrl(product, baseUrl) {
  if (!product?.slug) return "";
  const origin = baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  return `${origin}/product/${product.slug}`;
}

export function getGeneralWhatsAppMessage() {
  return [
    "Hello Ritika Marbles,",
    "",
    "I would like to enquire about your marble products and statues.",
    "",
    "Please share available options, pricing, and delivery details.",
    "",
    "Thank you!",
  ].join("\n");
}

export function getProductWhatsAppMessage(product, baseUrl) {
  const productUrl = getProductUrl(product, baseUrl);

  if (!product?.name) {
    return getGeneralWhatsAppMessage();
  }

  const lines = [
    "Hello Ritika Marbles,",
    "",
    "I would like to enquire about the following product:",
    "",
    `Product: ${product.name}`,
  ];

  if (productUrl) {
    lines.push(`Link: ${productUrl}`);
  }

  lines.push(
    "",
    "Could you please share pricing, availability, and delivery details?",
    "",
    "Thank you!",
  );

  return lines.join("\n");
}

export function getWhatsAppUrl(message) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getProductWhatsAppUrl(product, baseUrl) {
  return getWhatsAppUrl(getProductWhatsAppMessage(product, baseUrl));
}
