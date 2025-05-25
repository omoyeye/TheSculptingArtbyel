import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { getImage } from "@/assets/imageImports";

interface BeforeAfterItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: "1",
    title: "Abdominal Sculpting",
    description: "Wood Therapy + Cavitation (4 sessions)",
    image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
  },
  {
    id: "2",
    title: "Facial Contouring",
    description: "Lymphatic Drainage (3 sessions)",
    image: "DE40158A-B168-46C1-B082-94E9F91478C5.jpeg",
  },
  {
    id: "3",
    title: "Full Body Transformation",
    description: "Custom Treatment Plan (8 sessions)",
    image: "FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg",
  },
];

export default function BeforeAfterResults() {
  // This component now returns null, effectively removing it from the Home page
  return null;
}
