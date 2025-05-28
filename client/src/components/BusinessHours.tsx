import React from 'react';

export default function BusinessHours() {
  return (
    <div className="bg-muted p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-playfair text-secondary mb-4">Business Hours</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Monday</span>
          <span className="text-gray-500">Closed</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Tuesday - Sunday</span>
          <span className="text-gray-500">8:00 AM - 5:00 PM</span>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-lg font-medium text-secondary mb-2">Contact Us</h4>
        <p className="text-gray-600">
          Book your appointment today and start your transformation journey.
        </p>
        <a 
          href="tel:+447570618832" 
          className="mt-2 inline-block text-primary hover:text-primary/80"
        >
          +447570618832
        </a>
      </div>
    </div>
  );
}