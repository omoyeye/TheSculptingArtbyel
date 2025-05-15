import { useEffect, useState } from 'react';

// Import from our centralized images module
import { 
  beforeAfterImage, 
  img3361, 
  img3362 
} from '../assets/imageImports';

export default function ImageTest() {
  const [imagesExist, setImagesExist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const checkImages = async () => {
      const results: Record<string, boolean> = {};
      
      // Check if the imports exist
      results['beforeAfterImage'] = !!beforeAfterImage;
      results['img3361'] = !!img3361;
      results['img3362'] = !!img3362;
      
      setImagesExist(results);
    };
    
    checkImages();
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Image Test Results</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Image Existence Check:</h3>
        <ul className="list-disc pl-5">
          {Object.entries(imagesExist).map(([key, exists]) => (
            <li key={key} className={exists ? 'text-green-600' : 'text-red-600'}>
              {key}: {exists ? 'Exists' : 'Not Found'}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-medium mb-2">Before After Image:</h3>
          <img 
            src={beforeAfterImage} 
            alt="Before After" 
            className="w-full h-40 object-cover rounded"
          />
        </div>
        <div>
          <h3 className="font-medium mb-2">Image 3361:</h3>
          <img 
            src={img3361} 
            alt="IMG_3361" 
            className="w-full h-40 object-cover rounded"
          />
        </div>
        <div>
          <h3 className="font-medium mb-2">Image 3362:</h3>
          <img 
            src={img3362} 
            alt="IMG_3362" 
            className="w-full h-40 object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}