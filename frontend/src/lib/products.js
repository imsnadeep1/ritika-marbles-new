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
