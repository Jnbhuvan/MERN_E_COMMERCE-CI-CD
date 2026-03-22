import React from "react";

const AboutUs = () => {
  return (
    <section className="text-gray-600 body-font bg-gray-50">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        {/* Text Content */}
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
            Crafting Quality,
            <br className="hidden lg:inline-block" /> Delivered to Your Door
          </h1>
          <p className="mb-8 leading-relaxed text-lg">
            Since our founding, we've been dedicated to bringing you the finest
            handpicked products. We believe that shopping should be more than a
            transaction—it should be an experience rooted in quality,
            sustainability, and exceptional service.
          </p>
          <p className="mb-8 leading-relaxed italic text-gray-500">
            "Our mission is to bridge the gap between world-class artisans and
            conscious consumers like you."
          </p>

          <div className="flex justify-center">
            <a
              href="/products"
              className="inline-flex text-white bg-purple-600 border-0 py-2 px-6 focus:outline-none hover:bg-purple-700 rounded-lg text-lg transition-colors shadow-md"
            >
              Shop Collection
            </a>
            <a
              href="/our-story"
              className="ml-4 inline-flex text-gray-700 bg-white border border-gray-300 py-2 px-6 focus:outline-none hover:bg-gray-100 rounded-lg text-lg transition-colors"
            >
              Our Journey
            </a>
          </div>
        </div>

        {/* Visual Content */}
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded-2xl shadow-xl"
            alt="Our dedicated team and workspace"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=720&h=600"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
