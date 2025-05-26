// components/HeroSection.js
export default function HeroSection({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white py-20 px-4 text-center">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="mt-3 text-lg">{subtitle}</p>
    </div>
  );
}
