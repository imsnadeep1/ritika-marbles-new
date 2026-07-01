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

export function getProductWhatsAppMessage(product, baseUrl) {
  const productUrl = getProductUrl(product, baseUrl);
  if (!product?.name) {
    return "Hi, I would like to enquire about your marble products.";
  }

  return productUrl
    ? `Hi, I'm interested in ${product.name}\n\nProduct link: ${productUrl}`
    : `Hi, I'm interested in ${product.name}`;
}

export function getProductWhatsAppUrl(product, baseUrl) {
  const message = getProductWhatsAppMessage(product, baseUrl);
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
