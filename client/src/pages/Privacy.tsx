import { Helmet } from "react-helmet";

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - The Sculpting Art</title>
        <meta name="description" content="Privacy Policy for The Sculpting Art. Learn how we collect, use, and protect your personal information when you use our body sculpting and wellness services." />
      </Helmet>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-playfair text-secondary mb-8 text-center">Privacy Policy</h1>
          
          <div className="text-sm text-gray-600 mb-8 text-center">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">1. Introduction</h2>
              <p>
                The Sculpting Art ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, book our services, purchase our products, or interact with us in any way.
              </p>
              <p>
                By using our services or website, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-3">Personal Information</h3>
              <p>We may collect the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Health and medical information relevant to treatments</li>
                <li>Booking preferences and treatment history</li>
                <li>Product reviews and ratings</li>
                <li>Communication records and customer service interactions</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and browser information</li>
                <li>Website usage data and analytics</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Device information and operating system</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and managing our body sculpting and wellness services</li>
                <li>Processing bookings, appointments, and treatment sessions</li>
                <li>Processing product orders and payments</li>
                <li>Sending appointment confirmations and reminders</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Sending promotional offers and newsletters (with your consent)</li>
                <li>Improving our services and website functionality</li>
                <li>Maintaining treatment records for continuity of care</li>
                <li>Complying with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">4. Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our business (payment processors, booking systems, email services)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our customers</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of business assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure data encryption during transmission</li>
                <li>Restricted access to personal information</li>
                <li>Regular security assessments and updates</li>
                <li>Secure payment processing through certified providers</li>
                <li>Staff training on data protection practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">6. Cookies and Tracking Technologies</h2>
              <p>
                Our website uses cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
              </p>
              <p>
                We use cookies for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Website functionality and user preferences</li>
                <li>Analytics and performance monitoring</li>
                <li>Marketing and advertising (with your consent)</li>
                <li>Security and fraud prevention</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">7. Your Rights and Choices</h2>
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Treatment records may be retained longer as required by healthcare regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">10. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair text-secondary mb-4">12. Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-muted p-6 rounded-lg mt-4">
                <p><strong>The Sculpting Art</strong></p>
                <p>Email: privacy@thesculptingart.com</p>
                <p>Phone: [Your Phone Number]</p>
                <p>Address: [Your Business Address]</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}