// Import all images for direct access throughout the app
import beforeAfterImagePng from './images/Before After Beauty Skincare Minimlasit Instagram Post.png';
import beforeAfterImageJpeg from './images/Before After Beauty Skincare Minimlasit Instagram Post.jpeg';
import img3361 from './images/IMG_3361.jpeg';
import img3362 from './images/IMG_3362.jpeg';
import de40158a from './images/DE40158A-B168-46C1-B082-94E9F91478C5.jpeg';
import fdafd339 from './images/FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg';
import softBrownMassage from './images/Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png';
import brandingLogo from './images/Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png';
import screenshot154211 from './images/Screenshot 2025-05-04 154211.png';
import screenshot160111 from './images/Screenshot 2025-05-04 160111.png';
import waistTrainer1 from './images/1.jpg';
import waistTrainer2 from './images/2.jpg';
import woodTherapy from './images/wood-therapy.jpg';
import defaultTreatment from './images/default-treatment.jpg';

// Define a map for easy lookup by filename
const imageMap: Record<string, string> = {
  'Before After Beauty Skincare Minimlasit Instagram Post.png': beforeAfterImagePng,
  'Before After Beauty Skincare Minimlasit Instagram Post.jpeg': beforeAfterImageJpeg,
  'IMG_3361.jpeg': img3361,
  'IMG_3362.jpeg': img3362,
  'DE40158A-B168-46C1-B082-94E9F91478C5.jpeg': de40158a,
  'FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg': fdafd339,
  'Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png': softBrownMassage,
  'Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png': brandingLogo,
  'Screenshot 2025-05-04 154211.png': screenshot154211,
  'Screenshot 2025-05-04 160111.png': screenshot160111,
  '1.jpg': waistTrainer1,
  '2.jpg': waistTrainer2,
  'wood-therapy.jpg': woodTherapy,
  'default-treatment.jpg': defaultTreatment,
};

// Helper function to get image by filename
export function getImage(filename: string): string {
  const image = imageMap[filename as keyof typeof imageMap];
  if (!image) {
    console.warn(`Image not found: ${filename}`);
    return defaultTreatment;
  }
  return image;
}

// Named exports for direct access
export {
  beforeAfterImagePng,
  beforeAfterImageJpeg,
  img3361,
  img3362,
  de40158a,
  fdafd339,
  softBrownMassage,
  brandingLogo,
  screenshot154211,
  screenshot160111,
  waistTrainer1,
  waistTrainer2,
  woodTherapy
};