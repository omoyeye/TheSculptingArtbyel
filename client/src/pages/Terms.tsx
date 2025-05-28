import { Helmet } from "react-helmet";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - The Sculpting Art</title>
        <meta name="description" content="Terms of Service for The Sculpting Art. Read our terms and conditions for using our body sculpting services, booking system, and purchasing products." />
      </Helmet>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-playfair text-secondary mb-8 text-center">Terms of Service</h1>
          
          <div className="text-sm text-gray-600 mb-8 text-center">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">1. Agreement to Terms</h2>
              <p>
                Welcome to The Sculpting Art. These Terms of Service ("Terms") govern your use of our website, services, and products. By accessing our website, booking our services, or purchasing our products, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree with these Terms, please do not use our services or website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">2. Description of Services</h2>
              <p>The Sculpting Art provides professional body sculpting and wellness services, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Wood Therapy treatments (30 minutes and 1 hour sessions)</li>
                <li>Lymphatic Drainage massage (30 and 45 minute sessions)</li>
                <li>Recovery Boost post-operative massage (30 minutes and 1 hour)</li>
                <li>Cavitation and vacuum therapy</li>
                <li>Custom treatment packages and plans</li>
                <li>Body sculpting products and accessories</li>
                <li>Online booking and consultation services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">3. Booking and Appointments</h2>
              
              <h3 className="text-xl font-medium mb-3">Booking Requirements</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All appointments must be booked in advance through our website or by phone</li>
                <li>A £20 deposit is required for all treatment bookings</li>
                <li>The deposit will be deducted from your total treatment cost</li>
                <li>You must provide accurate personal and health information</li>
                <li>Clients under 18 require parental consent</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">Business Hours</h3>
              <p>Our services are available:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tuesday through Sunday: 8:00 AM - 5:00 PM</li>
                <li>Closed on Mondays</li>
                <li>Holiday hours may vary and will be posted in advance</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">Cancellation and Rescheduling</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Appointments may be cancelled or rescheduled with 24 hours advance notice</li>
                <li>Cancellations with less than 24 hours notice may forfeit the deposit</li>
                <li>No-shows will forfeit the full deposit amount</li>
                <li>We reserve the right to reschedule appointments due to emergencies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">4. Health and Safety</h2>
              
              <h3 className="text-xl font-medium mb-3">Health Disclosures</h3>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate health information and medical history</li>
                <li>Disclose any medical conditions, medications, or allergies</li>
                <li>Inform us of any changes to your health status</li>
                <li>Follow all pre- and post-treatment instructions</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">Contraindications</h3>
              <p>Our treatments may not be suitable if you have:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recent surgeries or open wounds</li>
                <li>Certain medical conditions (diabetes, heart conditions, etc.)</li>
                <li>Pregnancy or breastfeeding</li>
                <li>Active infections or inflammation</li>
                <li>Blood clotting disorders</li>
              </ul>
              <p>We reserve the right to refuse treatment if we determine it's not safe for you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">5. Payment Terms</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are listed in British Pounds (£)</li>
                <li>Payment is required at the time of service or product purchase</li>
                <li>We accept major credit cards, debit cards, and cash</li>
                <li>Package payments may be made in installments as agreed</li>
                <li>Prices are subject to change with notice</li>
                <li>Deposits are non-refundable except in cases of our cancellation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">6. Product Sales and Returns</h2>
              
              <h3 className="text-xl font-medium mb-3">Product Policy</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All product sales are final unless the item is defective</li>
                <li>Products must be inspected upon receipt</li>
                <li>Defective items may be exchanged within 7 days of purchase</li>
                <li>Products must be returned in original condition and packaging</li>
                <li>Custom or personalized items cannot be returned</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">Shipping</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free shipping on orders over £100</li>
                <li>Standard shipping rates apply to smaller orders</li>
                <li>Delivery times may vary based on location</li>
                <li>Risk of loss passes to you upon delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">7. Treatment Results and Expectations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Results may vary based on individual factors</li>
                <li>No specific outcomes or results are guaranteed</li>
                <li>Multiple sessions may be required for optimal results</li>
                <li>Lifestyle factors may affect treatment outcomes</li>
                <li>Before and after photos are examples and not guarantees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">8. Liability and Disclaimers</h2>
              <p>
                Our services are provided "as is" without warranties of any kind. To the fullest extent permitted by law, The Sculpting Art disclaims all warranties and shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Any adverse reactions or side effects from treatments</li>
                <li>Results that do not meet your expectations</li>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Personal injury (beyond our insurance coverage)</li>
                <li>Loss of income or business opportunities</li>
              </ul>
              <p className="mt-4">
                Our total liability shall not exceed the amount paid for the specific service or product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">9. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All website content, logos, and materials are our property</li>
                <li>You may not reproduce or distribute our content without permission</li>
                <li>Customer reviews and photos may be used for marketing purposes</li>
                <li>You grant us license to use your testimonials and feedback</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">10. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">11. User Conduct</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide false or misleading information</li>
                <li>Use our services for illegal purposes</li>
                <li>Interfere with our website or services</li>
                <li>Harass or disturb other clients or staff</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">12. Termination</h2>
              <p>
                We may terminate or suspend your access to our services at our discretion, with or without cause, including for violation of these Terms. Upon termination, all provisions that should survive termination will remain in effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">13. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">14. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">15. Contact Information</h2>
              <p>
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg mt-4">
                <p><strong>The Sculpting Art</strong></p>
                <p>Email: info@thesculptingart.com</p>
                <p>Phone: [Your Phone Number]</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">16. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}