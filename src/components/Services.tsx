import { services } from "@/data/projects";

export default function Services() {
  return (
    <section className="py-20 px-6 md:px-10 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 uppercase tracking-wider">
          Naše služby
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 hover:border-black transition-colors duration-300"
            >
              <span className="text-3xl font-light text-gray-300 mb-4 block">
                0{index + 1}
              </span>
              <h3 className="text-lg font-medium">{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
