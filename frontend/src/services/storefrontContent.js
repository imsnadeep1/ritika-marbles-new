import { supabase } from "@/lib/supabaseClient";

const STORAGE_KEY = "ritika-storefront-content";
const CONTENT_ID = "main";

export const defaultStorefrontContent = {
  bestseller: {
    title: "White Marble Ganesh Statue",
    subtitle: "Ready for inquiry",
    imageUrl: "/images/products/ganesh-new-top.png",
    ctaLabel: "View",
    ctaHref: "/god-statue",
  },
  collections: [
    {
      id: "home-temple",
      title: "Home Temple Essentials",
      description: "Curated idols and decor for daily worship spaces.",
      imageUrl: "/images/products/decor.png",
      href: "/collections/handicrafts",
      enabled: true,
    },
    {
      id: "premium-decor",
      title: "Premium Marble Decor",
      description: "Statement pieces for interiors, gifting, and display.",
      imageUrl: "/images/products/decor2.png",
      href: "/collections/home-decor",
      enabled: true,
    },
  ],
  godStatues: {
    title: "God Statues",
    description:
      "Explore our divine collection of handcrafted marble god statues, each piece created with devotion and precision.",
    ctaTitle: "Looking for Something Custom?",
    ctaDescription:
      "We specialize in creating custom marble statues tailored to your specifications.",
  },
  clientDiary: {
    title: "Client Diaries",
    description:
      "Hear what our valued customers have to say about their experience with Ritika Marbles.",
  },
  blogPosts: [
    {
      id: "choosing-marble-idol",
      title: "How to choose the right marble idol size",
      excerpt:
        "A practical guide to selecting idol size, placement, finish, and delivery expectations.",
      imageUrl: "/images/products/ganesh-new-top.png",
      href: "/blog/choosing-marble-idol",
      publishedAt: "2026-05-17",
      enabled: true,
    },
  ],
};

function mergeContent(content = {}) {
  return {
    ...defaultStorefrontContent,
    ...content,
    bestseller: {
      ...defaultStorefrontContent.bestseller,
      ...(content.bestseller || {}),
    },
    godStatues: {
      ...defaultStorefrontContent.godStatues,
      ...(content.godStatues || {}),
    },
    clientDiary: {
      ...defaultStorefrontContent.clientDiary,
      ...(content.clientDiary || {}),
    },
    collections: content.collections || defaultStorefrontContent.collections,
    blogPosts: content.blogPosts || defaultStorefrontContent.blogPosts,
  };
}

function getLocalContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? mergeContent(JSON.parse(stored)) : defaultStorefrontContent;
  } catch {
    return defaultStorefrontContent;
  }
}

function setLocalContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export async function getStorefrontContent() {
  if (!supabase) return getLocalContent();

  const { data, error } = await supabase
    .from("storefront_content")
    .select("content")
    .eq("id", CONTENT_ID)
    .maybeSingle();

  if (error || !data?.content) {
    return getLocalContent();
  }

  const content = mergeContent(data.content);
  setLocalContent(content);
  return content;
}

export async function saveStorefrontContent(content) {
  const merged = mergeContent(content);
  setLocalContent(merged);

  if (!supabase) return { savedRemotely: false, content: merged };

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      savedRemotely: false,
      content: merged,
      reason: "unauthenticated",
    };
  }

  const { error } = await supabase
    .from("storefront_content")
    .upsert({ id: CONTENT_ID, content: merged });

  if (error) {
    const isMissingTable =
      error?.code === "42P01" ||
      /relation .*storefront_content.* does not exist/i.test(error?.message || "");
    const isPermissionIssue =
      error?.code === "42501" || /permission denied|row-level security/i.test(error?.message || "");

    return {
      savedRemotely: false,
      content: merged,
      error,
      reason: isMissingTable
        ? "missing_table"
        : isPermissionIssue
          ? "permission_denied"
          : "unknown",
    };
  }

  return { savedRemotely: true, content: merged };
}

export async function uploadStorefrontAsset(file) {
  if (!supabase) throw new Error("Supabase is not configured for uploads.");

  const fileName = `storefront-${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("products")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("products").getPublicUrl(fileName);

  return publicUrl;
}
