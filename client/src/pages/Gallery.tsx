import { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useStore } from "@/lib/store";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger
} from "@/components/ui/dialog";
import Newsletter from "@/components/Newsletter";
import { getImage } from "@/assets/imageImports";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const { treatments } = useStore();
  
  // Create gallery items based on treatments and add Before/After images
  const allGalleryItems: GalleryItem[] = [
    {
      id: "before-after-1",
      title: "Abdominal Sculpting Results",
      category: "Before & After",
      image: "Before After Beauty Skincare Minimlasit Instagram Post.png"
    },
    {
      id: "before-after-2",
      title: "Facial Contouring Results",
      category: "Before & After",
      image: "IMG_3362.jpeg"
    },
    {
      id: "before-after-3",
      title: "Full Body Transformation",
      category: "Before & After",
      image: "Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png"
    },
    {
      id: "before-after-4",
      title: "Male Body Sculpting",
      category: "Before & After",
      image: "DE40158A-B168-46C1-B082-94E9F91478C5.jpeg"
    },
    {
      id: "before-after-5",
      title: "Post-Treatment Recovery",
      category: "Before & After",
      image: "IMG_3361.jpeg"
    },
    {
      id: "before-after-6",
      title: "Skin Rejuvenation",
      category: "Before & After",
      image: "FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg"
    },
    ...treatments.map(treatment => ({
      id: `treatment-${treatment.id}`,
      title: treatment.title,
      category: "Treatments",
      image: treatment.image
    }))
  ];

  // Remove duplicates based on image filename
  const galleryItems: GalleryItem[] = allGalleryItems.filter((item, index, array) => {
    const firstIndex = array.findIndex(otherItem => otherItem.image === item.image);
    return firstIndex === index;
  });

  const getImagePath = useCallback((filename: string) => {
    try {
      // Use the centralized image import system
      return getImage(filename);
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);

  const categorySet = new Set(galleryItems.map(item => item.category));
  const categories = Array.from(categorySet);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGalleryItems = galleryItems.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

  return (
    <>
      <Helmet>
        <title>Gallery | The Sculpting Art</title>
        <meta name="description" content="View our gallery of before and after transformations and treatment results at The Sculpting Art." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore real transformations and results from our body sculpting treatments.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                className={`px-4 py-2 rounded-full ${
                  activeCategory === "All"
                    ? "bg-secondary text-white"
                    : "bg-white text-secondary border border-secondary hover:bg-muted"
                }`}
                onClick={() => setActiveCategory("All")}
              >
                All
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    activeCategory === category
                      ? "bg-secondary text-white"
                      : "bg-white text-secondary border border-secondary hover:bg-muted"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGalleryItems.map(item => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div 
                    className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={getImagePath(item.image)}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <h3 className="font-medium text-secondary truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-center">
                      <img 
                        src={getImagePath(item.image)}
                        alt={item.title}
                        className="max-h-[70vh] object-contain rounded-md"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h2 className="text-2xl font-playfair text-secondary mb-2">{item.title}</h2>
                      <p className="text-muted-foreground mb-4">{item.category}</p>
                      <p className="text-gray-700">
                        This is a result of our professional {item.category === "Before & After" ? "treatment" : "service"} provided at The Sculpting Art. We focus on delivering exceptional results through our innovative, non-invasive techniques.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
