'use client';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">HELP & SUPPORT</h1>
      
      <div className="space-y-8">
        {/* Contact Section */}
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">CONTACT US</h2>
          <p className="text-gray-600 mb-2">Email: support@luminousone.com</p>
          <p className="text-gray-600 mb-2">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-600">Hours: Monday - Friday, 9 AM - 6 PM</p>
        </section>

        {/* FAQs */}
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">FREQUENTLY ASKED QUESTIONS</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">How do I track my order?</h3>
              <p className="text-gray-600">After logging in, go to "My Orders" to view all your orders and their current status.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What is the return policy?</h3>
              <p className="text-gray-600">We offer a 30-day return policy for all items in original condition with tags attached.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How long does shipping take?</h3>
              <p className="text-gray-600">Standard shipping takes 5-7 business days. Express shipping options are available at checkout.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you ship internationally?</h3>
              <p className="text-gray-600">Yes, we ship to most countries worldwide. Shipping costs and times vary by location.</p>
            </div>
          </div>
        </section>

        {/* Shipping Info */}
        <section className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">SHIPPING INFORMATION</h2>
          <p className="text-gray-600 mb-2">Free standard shipping on orders over $50</p>
          <p className="text-gray-600 mb-2">Express shipping available for $15</p>
          <p className="text-gray-600">Orders are processed within 1-2 business days</p>
        </section>

        {/* Size Guide */}
        <section>
          <h2 className="text-xl font-semibold mb-4">SIZE GUIDE</h2>
          <p className="text-gray-600 mb-4">For detailed size information, please check the size guide on each product page.</p>
        </section>
      </div>
    </div>
  );
}
