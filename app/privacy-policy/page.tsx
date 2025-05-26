import MainFooter from "@/components/main-footer";
import MainNavigation from "@/components/main-navigation";
import { Reveal } from "@/components/reveal";

export default function PrivacyPolicy() {
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
                Privacy Policy
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
            AI First, a brand of&nbsp;
            <strong>Conceptsworld Group Limited</strong>, respects your privacy.
            This Privacy Policy explains how we collect, use, and protect your
            information when you use our Services.
          </p>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>
              <strong>Information You Provide:</strong>&nbsp;Includes
              registration details, communications, uploaded content, and
              billing information.
            </li>
            <li>
              <strong>Information We Collect Automatically:</strong>
              &nbsp;Includes device information, usage data, IP address, browser
              type, and cookies.
            </li>
            <li>
              <strong>Information from Third Parties:</strong>&nbsp;We may
              receive data from service providers, partners, or publicly
              available sources.
            </li>
          </ul>
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve the Services</li>
            <li>Communicate with you</li>
            <li>Personalize your experience</li>
            <li>Conduct analytics</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>&nbsp;</p>
          <h2>3. Sharing of Information</h2>
          <p>We may share information with:</p>
          <ul>
            <li>Service providers and vendors</li>
            <li>Affiliates and subsidiaries</li>
            <li>Legal or regulatory authorities when required</li>
            <li>As part of a business transfer or acquisition</li>
          </ul>
          <p>
            We do&nbsp;<strong>not</strong>&nbsp;sell your personal information.
          </p>
          <p>&nbsp;</p>
          <h2>4. Data Retention</h2>
          <p>
            We retain your data as long as necessary for the purposes outlined
            above or as required by law.
          </p>
          <h2>5. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Request correction or deletion</li>
            <li>Object to or restrict processing</li>
            <li>Withdraw consent</li>
            <li>
              Lodge complaints with a supervisory authority (e.g., UK’s ICO)
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at&nbsp;
            <strong>hello@aifirst.one</strong>.
          </p>
          <p>&nbsp;</p>
          <h2>6. Security</h2>
          <p>
            We use reasonable safeguards to protect your data. However, no
            system is completely secure.
          </p>
          <h2>7. International Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries
            outside of your own, including the United Kingdom, where data
            protection laws may differ.
          </p>
          <h2>8. Children</h2>
          <p>
            Our Services are not intended for individuals under 18. We do not
            knowingly collect data from children.
          </p>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy. We will notify you of material
            changes as required by law.
          </p>
          <h2>10. Contact Us</h2>
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
