import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { ArrowRight, Calendar, ChevronLeft } from "lucide-react";
import { defaultStorefrontContent, getStorefrontContent } from "@/services/storefrontContent";
import ComingSoon from "@/components/ComingSoon";

function getPostSlug(post) {
  if (post.id) return post.id;
  const href = post.href || "";
  const parts = href.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      if (parsed.pathname.startsWith("/embed/")) return url;
    }
  } catch {
    return null;
  }
  return null;
}

const BlogVideo = ({ videoUrl, poster }) => {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (embedUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={embedUrl}
          title="Blog video"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video
      src={videoUrl}
      controls
      poster={poster}
      className="w-full rounded-xl bg-black"
    >
      Your browser does not support the video tag.
    </video>
  );
};

const BlogPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState(defaultStorefrontContent.blogPosts);

  useEffect(() => {
    getStorefrontContent().then((content) => {
      setPosts(content.blogPosts.filter((post) => post.enabled !== false));
    });
  }, []);

  const activePost = slug
    ? posts.find((post) => getPostSlug(post) === slug)
    : null;

  if (slug && activePost) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <section className="bg-[#1F3D36] py-12 sm:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#F8D98E] hover:text-white mb-6"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to blog
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4A853] mb-3">
                <Calendar className="w-4 h-4" />
                {activePost.publishedAt || "Draft"}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {activePost.title}
              </h1>
            </div>
          </section>

          <section className="py-12 sm:py-16 bg-[#F8F1E8]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {activePost.videoUrl ? (
                <BlogVideo
                  videoUrl={activePost.videoUrl}
                  poster={activePost.imageUrl}
                />
              ) : (
                <img
                  src={activePost.imageUrl || "/images/placeholder.jpg"}
                  alt={activePost.title}
                  className="w-full max-h-[28rem] object-cover rounded-[1.5rem] shadow-lg"
                />
              )}

              <div className="rounded-[1.5rem] bg-white p-6 sm:p-8 shadow-sm border border-[#E8D9C5]">
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {activePost.excerpt}
                </p>
              </div>

              {activePost.videoUrl && activePost.imageUrl && (
                <img
                  src={activePost.imageUrl}
                  alt={activePost.title}
                  className="w-full max-h-80 object-cover rounded-[1.5rem] shadow-sm"
                />
              )}
            </div>
          </section>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    );
  }

  if (slug && !activePost) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#1F3D36]">Post not found</h1>
          <Link to="/blog" className="text-[#D4A853] hover:underline mt-4 inline-block">
            Back to blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-[#1F3D36] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#D4A853] text-sm font-bold uppercase tracking-[0.25em] mb-4">
              Buying guides
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Marble craft blog
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
              Tips for choosing marble idols, caring for handcrafted pieces, and planning custom orders.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-20 bg-[#F8F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <ComingSoon
                title="Blog coming soon"
                description="Buying guides, care tips, and custom-order advice will appear here once published from the admin dashboard."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => {
                  const postSlug = getPostSlug(post);
                  const postHref = postSlug ? `/blog/${postSlug}` : "/blog";

                  return (
                    <article
                      key={post.id || post.title}
                      className="rounded-[1.5rem] sm:rounded-[2rem] bg-white overflow-hidden shadow-sm border border-[#E8D9C5] hover:-translate-y-1 hover:shadow-lg transition-all"
                    >
                      {post.videoUrl ? (
                        <div className="relative">
                          <BlogVideo videoUrl={post.videoUrl} poster={post.imageUrl} />
                          <span className="absolute left-3 top-3 rounded-full bg-[#1F3D36]/90 px-3 py-1 text-xs font-bold text-white">
                            Video
                          </span>
                        </div>
                      ) : (
                        <img
                          src={post.imageUrl || "/images/placeholder.jpg"}
                          alt={post.title}
                          className="w-full h-52 sm:h-56 object-cover"
                        />
                      )}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#B8872F] mb-3">
                          <Calendar className="w-4 h-4" />
                          {post.publishedAt || "Draft"}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-[#1F3D36] mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-slate-600 line-clamp-3 text-sm sm:text-base">
                          {post.excerpt}
                        </p>
                        <Link
                          to={postHref}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1F3D36] hover:text-[#B8872F]"
                        >
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default BlogPage;
