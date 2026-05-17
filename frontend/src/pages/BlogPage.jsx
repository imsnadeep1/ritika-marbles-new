import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import { ArrowRight, Calendar } from "lucide-react";
import { defaultStorefrontContent, getStorefrontContent } from "@/services/storefrontContent";

const BlogPage = () => {
  const [posts, setPosts] = useState(defaultStorefrontContent.blogPosts);

  useEffect(() => {
    getStorefrontContent().then((content) => {
      setPosts(content.blogPosts.filter((post) => post.enabled !== false));
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-[#1F3D36] py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-[#D4A853] text-sm font-bold uppercase tracking-[0.25em] mb-4">
              Buying guides
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Marble craft blog
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Tips for choosing marble idols, caring for handcrafted pieces, and planning custom orders.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#F8F1E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="rounded-[2rem] bg-white p-10 text-center text-slate-500">
                No blog posts are published yet.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article key={post.id || post.title} className="rounded-[2rem] bg-white overflow-hidden shadow-sm border border-[#E8D9C5]">
                    <img
                      src={post.imageUrl || "/images/placeholder.jpg"}
                      alt={post.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#B8872F] mb-3">
                        <Calendar className="w-4 h-4" />
                        {post.publishedAt || "Draft"}
                      </div>
                      <h2 className="text-2xl font-bold text-[#1F3D36] mb-3">{post.title}</h2>
                      <p className="text-slate-600 line-clamp-3">{post.excerpt}</p>
                      <a
                        href={post.href || "#"}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#1F3D36] hover:text-[#B8872F]"
                      >
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                ))}
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
