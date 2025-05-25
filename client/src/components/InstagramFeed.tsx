import { Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { useCallback } from "react";
import { getImage } from "@/assets/imageImports";

export default function InstagramFeed() {
  const { instagramPosts } = useStore();

  // Use the centralized image getter function
  const getImagePath = useCallback((filename: string) => {
    return getImage(filename);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-secondary mb-4">
            Follow Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our community on Instagram for daily inspiration, tips, and special offers.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id}
              href="https://www.instagram.com/the_sculptingartbyel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block relative group overflow-hidden rounded-lg"
            >
              <img 
                src={getImagePath(post.image)} 
                alt="Instagram Post" 
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <Heart className="text-white mr-2 fill-white" size={18} />
                <span className="text-white">{post.likes}</span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="https://www.instagram.com/the_sculptingartbyel/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center text-secondary hover:text-secondary/80 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2 fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @the_sculptingartbyel
          </a>
        </div>
      </div>
    </section>
  );
}
