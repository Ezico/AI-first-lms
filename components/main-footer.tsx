import Link from "next/link";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className=" bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-purple-700 text-white p-2 rounded mr-2">
                <span className="font-bold text-xl">AI</span>
              </div>
              <span className="font-bold text-xl">FIRST</span>
            </div>
            <p className="text-gray-400 mb-4">
              The essential ecosystem for business leaders navigating the AI
              transformation journey.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Ecosystem</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/book"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  The Book
                </Link>
              </li>
              <li>
                <Link
                  href="/academy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI First Academy
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/summit"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI First Summit
                </Link>
              </li>
              <li>
                <Link
                  href="/podcast"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI First Podcast
                </Link>
              </li> */}
            </ul>
          </div>

          {/* <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Free Resources
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              {/* <li>
                <a
                  href="/about-us"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li> */}
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AI First. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
