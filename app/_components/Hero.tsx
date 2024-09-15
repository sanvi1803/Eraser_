import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-black">
        <div className="flex items-baseline justify-center pt-10">
          <h2 className="text-white border px-3 p-2 rounded-full border-white text-center">
            See What's New | <span className="text-sky-300">AI Diagram</span>
          </h2>
        </div>
        <div className="mx-auto max-w-screen-xl px-4 py-12 lg:flex h-screen">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-sky-300">
              Documents & Diagrams
              <strong className="font-extrabold text-white sm:block">
                {" "}
                for engineering teams.{" "}
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-slate-200">
              All-in-one markdown editor, collaborative canvas, and
              diagram-as-code builder
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-slate-300-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
