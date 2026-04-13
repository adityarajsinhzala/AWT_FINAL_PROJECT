import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">About</h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          This store is for ordering items; No! it's Awt final project.
        </p>

        <p className="text-gray-700 mb-6 leading-relaxed">
          No fake discounts, everything is fake, no spammy UX.
        </p>

        <p className="text-gray-700 leading-relaxed">
          This website is fast than yours.
        </p>
      </div>
    </>
  );
}

export default About;