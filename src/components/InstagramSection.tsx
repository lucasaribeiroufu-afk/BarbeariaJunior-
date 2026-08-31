import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { INSTAGRAM_POSTS, STUDIO_INFO } from '../data/mockData';

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram" className="py-24 bg-[#09090b] border-t border-[#27272a]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#27272a]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Instagram className="w-4 h-4 text-[#c5a059]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a059] font-sans">
                CONEXÃO & COMUNIDADE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f4f4f5] tracking-tight">
              Siga {STUDIO_INFO.instagramHandle}
            </h2>
            <p className="mt-2 text-sm text-[#a1a1aa] font-sans">
              Acompanhe transformações diárias, novidades de grooming e bastidores do studio.
            </p>
          </div>

          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="self-start md:self-auto px-6 py-3 bg-gradient-to-r from-[#833ab4]/20 via-[#fd1d1d]/20 to-[#fcb045]/20 hover:from-[#833ab4]/40 hover:via-[#fd1d1d]/40 hover:to-[#fcb045]/40 border border-[#c5a059]/40 text-[#f4f4f5] hover:text-[#c5a059] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2 group"
            id="btn-instagram-follow"
          >
            <Instagram className="w-4 h-4 text-[#c5a059]" />
            <span>Seguir no Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative bg-[#121215] border border-[#27272a] hover:border-[#c5a059]/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 shadow-lg"
            >
              {/* Photo Area */}
              <div className="aspect-square w-full relative overflow-hidden bg-[#18181c]">
                <img
                  src={post.imageUrl}
                  alt="Post do Instagram 13302 Studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Hover overlay with likes and comments */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white text-sm font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-5 h-5 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <div className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-sm rounded-full text-white/80">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Caption Preview */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#d4d4d8] line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
                <div className="mt-3 pt-2 border-t border-[#27272a] flex items-center justify-between text-[11px] text-[#71717a]">
                  <span>{post.date}</span>
                  <span className="text-[#c5a059] group-hover:underline">Ver post</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
