import { useEffect, useState } from "react";

const ApiHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const Response = await fetch("https://dummyjson.com/product");

      if (!Response.ok) {
        throw new Error("Something went wrong while fetching products!");
      }

      const data = await Response.json();

      setProducts(data.products);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="min-h-screen w-full bg-[#F8FAFC] py-16">
      <div className="mx-auto w-full max-w-305 px-5">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Our Collection
          </span>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore Our Products
          </h1>

          <p className="mt-3 text-gray-500">
            Discover amazing products at great prices.
          </p>
        </div>

        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
              <p className="font-semibold text-gray-600">Loading Products...</p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="mb-2 text-xl font-bold text-red-600">
              Oops! Something went wrong.
            </h2>

            <p className="mb-5 text-sm text-red-500">{error}</p>

            <button
              onClick={getProducts}
              className="group relative overflow-hidden rounded-full bg-red-500 px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 cursor-pointer border border-red-500"
            >
              <span className="absolute inset-0 translate-x-[-120%] rounded-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0"></span>

              
                <span className="relative z-99 group-hover:text-red-500 text-white transition-all duration-300 ease-in">Try Again</span>
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          (products.length > 0 ? (
            <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-7 max-md:grid-cols-2 max-lg:grid-cols-3">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer flex h-105 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex h-55 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#F8FAFC] p-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-1 flex-col pt-5">
                    <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-500">
                      {item.category}
                    </span>

                    <h2 className="line-clamp-2 min-h-12 text-base font-bold text-gray-800">
                      {item.title}
                    </h2>

                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="text-xl font-bold text-gray-900">
                          ${item.price}
                        </p>
                      </div>

                      <span className="rounded-full bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600">
                        ★ {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center font-semibold text-gray-500">
              No products found!
            </p>
          ))}
      </div>
    </section>
  );
};

export default ApiHome;
