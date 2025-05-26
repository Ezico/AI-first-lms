import MainFooter from "@/components/main-footer";
import MainNavigation from "@/components/main-navigation";
import { Reveal } from "@/components/reveal";

export default function Page() {
  return (
    <>
      <MainNavigation />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/ai-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <Reveal>
            <div className="space-y-6">
              <h1 className="text-4xl text-center font-bold tracking-tight sm:text-5xl">
                Terms of Service
              </h1>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 py-12 text-gray-700 space-y-6">
        <div className="entry clr">
          <p>
            <strong>Effective Date:</strong> 08/04/2025
          </p>
          <p>
            Welcome to AI First, a brand of&nbsp;
            <strong>Conceptsworld Group Limited</strong>, registered at 128 City
            Road, London, United Kingdom, EC1V 2NX (“AI First”, “we”, “our”, or
            “us”). These Terms of Service (“Terms”) govern your access to and
            use of our products, services, websites, and applications
            (collectively, the “Services”).
          </p>
          <p>
            By accessing or using our Services, you agree to be bound by these
            Terms and our Privacy Policy. If you are using the Services on
            behalf of an organization, you agree to these Terms on behalf of
            that organization.
          </p>
          <h2>1. Eligibility</h2>
          <p>
            You must be at least 18 years old or the age of majority in your
            jurisdiction to use our Services. By using our Services, you
            represent and warrant that you meet these requirements.
          </p>
          <h2>2. Use of Services</h2>
          <p>
            You may use the Services only in compliance with these Terms and all
            applicable laws. You agree not to misuse our Services or attempt to
            interfere with their proper operation.
          </p>
          <h2>3. Account Registration</h2>
          <p>
            You may need to register for an account to access some features. You
            agree to provide accurate and complete information and to keep this
            information up to date.
          </p>
          <h2>4. Intellectual Property</h2>
          <p>
            All content and materials provided through the Services, including
            but not limited to software, text, images, and branding, are the
            property of AI First or its licensors and are protected under UK and
            international laws.
          </p>
          <h2>5. User Content</h2>
          <p>
            You retain ownership of content you upload or input into the
            Services. By submitting content, you grant AI First a non-exclusive,
            worldwide, royalty-free license to use, reproduce, and display it
            solely to operate and improve the Services.
          </p>
          <h2>6. Feedback</h2>
          <p>
            If you provide feedback, you grant AI First the right to use it
            without restriction or compensation to you.
          </p>
          <h2>7. Third-Party Services</h2>
          <p>
            Our Services may contain links or integrations with third-party
            services. We are not responsible for the content or practices of
            those third parties.
          </p>
          <h2>8. Termination</h2>
          <p>
            We may suspend or terminate your access to the Services at any time
            if we reasonably believe you have violated these Terms.
          </p>
          <h2>9. Disclaimers</h2>
          <p>
            Our Services are provided “as is” without warranties of any kind. We
            disclaim all warranties to the fullest extent permitted by law.
          </p>
          <h2>10. Limitation of Liability</h2>
          <p>
            To the extent permitted by law, AI First and its affiliates shall
            not be liable for any indirect, incidental, special, or
            consequential damages, or loss of profits or revenues.
          </p>
          <h2>11. Governing Law</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any
            disputes arising from these Terms shall be subject to the exclusive
            jurisdiction of the courts of England.
          </p>
          <h2>12. Changes</h2>
          <p>
            We may update these Terms from time to time. If we make material
            changes, we’ll notify you. Your continued use of the Services after
            changes means you accept the revised Terms.
          </p>
          <h2>13. Contact</h2>
          <p>
            <strong>Conceptsworld Group Limited</strong>
            <br />
            128 City Road
            <br />
            London, United Kingdom
            <br />
            EC1V 2NX
            <br />
            hello@aifirst.one
          </p>
        </div>
      </div>
      <MainFooter />
    </>
  );
}
