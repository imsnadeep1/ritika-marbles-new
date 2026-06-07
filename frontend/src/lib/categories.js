export const CATEGORY_GROUPS = {
  GOD_STATUES: "god-statues",
  MARBLE_COLLECTIONS: "marble-collections",
};

export const CATEGORY_GROUP_OPTIONS = [
  { value: CATEGORY_GROUPS.GOD_STATUES, label: "God Statues" },
  { value: CATEGORY_GROUPS.MARBLE_COLLECTIONS, label: "Marble Collections" },
];

export function getCategoryGroup(category) {
  return category.menu_group || CATEGORY_GROUPS.GOD_STATUES;
}

export function getCategoryHref(category) {
  return `/category/${category.slug}`;
}

export function isActiveCategory(category) {
  return category.is_active !== false;
}

export function sortCategories(categories = []) {
  return [...categories].sort((a, b) => {
    const orderDifference = (a.sort_order ?? 100) - (b.sort_order ?? 100);
    return orderDifference || a.name.localeCompare(b.name);
  });
}

export function getVisibleCategories(categories = [], options = {}) {
  const { group, placement } = options;

  return sortCategories(categories).filter((category) => {
    if (!isActiveCategory(category)) return false;
    if (group && getCategoryGroup(category) !== group) return false;
    if (placement && category[placement] === false) return false;
    return true;
  });
}
