import Link from "next/link";

const NotFound = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex items-center h-screen">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-[#2474A6]">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-[#2474A6] md:text-4xl">
            Something is missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Sorry we can not find that page. You will find lots to explore on
            the home page.
          </p>
          <Link
            href="/"
            className="inline-flex bg-primary-600 border hover:border-gray-300 outline-none hover:bg-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};
export default NotFound;