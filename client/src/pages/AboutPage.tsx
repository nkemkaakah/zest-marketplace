import type { ReactElement } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function AboutPage(): ReactElement {
  return (
    <div className="mx-auto w-full px-4 py-10 lg:px-site">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "About" },
        ]}
      />
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="font-display text-heading-54 text-fg">Our Story</h1>
          <div className="mt-8 space-y-6 font-sans text-title-16 leading-7 text-fg opacity-85">
            <p>
              Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an
              active presence in Bangladesh. Supported by a wide range of tailored marketing, data,
              and service solutions, Exclusive has thousands of sellers and hundreds of brands serving
              customers across the region.
            </p>
            <p>
              Exclusive has more than one million products to offer, growing fast. Exclusive offers a
              diverse assortment in categories ranging from consumer electronics to fashion and home.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-md bg-surface-muted">
          <img
            src="https://picsum.photos/seed/about-team/800/600"
            alt=""
            className="h-full max-h-[480px] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <section className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {["Sellers", "Monthly sales", "Customers", "Brands"].map((label, i) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface-muted py-10 text-center"
          >
            <span className="font-display text-heading-40 text-fg">{[10, 200, 3, 300][i]}</span>
            <span className="font-sans text-title-16 opacity-80">{label}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
