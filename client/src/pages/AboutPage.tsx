import type { ReactElement } from "react";
import { Instagram, Linkedin, Truck, Twitter } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function AboutPage(): ReactElement {
  return (
    <div className="mx-auto w-full px-4 py-20 lg:px-site">
      <Breadcrumb
        variant="muted-trail"
        items={[
          { label: "Home", to: "/" },
          { label: "About" },
        ]}
      />
      <div className="mt-10 grid grid-cols-1 items-center gap-12 xl:grid-cols-[1fr_705px] xl:gap-[75px]">
        <div className="max-w-[525px]">
          <h1 className="font-display text-heading-54 tracking-[3.24px] text-fg">Our Story</h1>
          <div className="mt-10 space-y-6 font-sans text-title-16 leading-[26px] text-fg">
            <p>
              Launced in 2015, Exclusive is South Asia&apos;s premier online shopping makterplace with
              an active presense in Bangladesh. Supported by wide range of tailored marketing, data
              and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3
              millioons customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive
              offers a diverse assotment in categories ranging from consumer.
            </p>
          </div>
        </div>
        <div className="h-[609px] overflow-hidden rounded-l-control bg-[#EB7EA8]">
          <img
            src="https://www.figma.com/api/mcp/asset/78f3f1d6-d8e6-467e-b6ce-a40410b97a66"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <section className="mt-[140px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
        {[
          { value: "10.5k", label: "Sallers active our site", active: false, icon: "shop" },
          { value: "33k", label: "Mopnthly Produduct Sale", active: true, icon: "sale" },
          { value: "45.5k", label: "Customer active in our site", active: false, icon: "bag" },
          { value: "25k", label: "Anual gross sale in our site", active: false, icon: "money" },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex h-[230px] flex-col items-center justify-center gap-6 rounded-control border ${
              item.active
                ? "border-sale bg-sale text-fg-inverse shadow-[0px_2px_10px_2px_rgba(0,0,0,0.2)]"
                : "border-black/30 bg-surface text-fg"
            }`}
          >
            <div className="flex size-20 items-center justify-center rounded-full bg-black/15">
              <div
                className={`flex size-14 items-center justify-center rounded-full ${
                  item.active ? "bg-surface" : "bg-black"
                }`}
              >
                <span
                  className={`font-sans text-title-20-md ${item.active ? "text-sale" : "text-fg-inverse"}`}
                >
                  {item.icon === "shop" ? "🏬" : item.icon === "sale" ? "💲" : item.icon === "bag" ? "👜" : "💰"}
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-display text-heading-32 tracking-[1.28px]">{item.value}</p>
              <p className="mt-3 font-sans text-title-16">{item.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-[140px]">
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-3">
          {[
            {
              name: "Tom Cruise",
              role: "Founder & Chairman",
              image: "https://www.figma.com/api/mcp/asset/f3ebd23c-10a2-450f-a426-9d60fd0d7a20",
            },
            {
              name: "Emma Watson",
              role: "Managing Director",
              image: "https://www.figma.com/api/mcp/asset/2e541333-595a-45cb-83e5-e4c7fe5d4d54",
            },
            {
              name: "Will Smith",
              role: "Product Designer",
              image: "https://www.figma.com/api/mcp/asset/4e374372-5e47-4c7a-9c2e-621bc7cedfa6",
            },
          ].map((member) => (
            <article key={member.name}>
              <div className="h-[430px] overflow-hidden rounded-control bg-surface-muted">
                <img src={member.image} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
              </div>
              <div className="mt-8">
                <h3 className="font-display text-heading-32 tracking-[1.28px] text-fg">{member.name}</h3>
                <p className="mt-2 font-sans text-title-16 text-fg">{member.role}</p>
                <div className="mt-4 flex items-center gap-4 text-fg">
                  <Twitter className="size-5" strokeWidth={1.6} />
                  <Instagram className="size-5" strokeWidth={1.6} />
                  <Linkedin className="size-5" strokeWidth={1.6} />
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <span className="size-3 rounded-full bg-fg/30" />
          <span className="size-3 rounded-full bg-fg/30" />
          <span className="size-3 rounded-full border-2 border-white bg-sale" />
          <span className="size-3 rounded-full bg-fg/30" />
        </div>
      </section>

      <section className="mt-[140px] grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-[88px]">
        {[
          {
            title: "FREE AND FAST DELIVERY",
            copy: "Free delivery for all orders over $140",
            icon: <Truck className="size-9 text-fg-inverse" strokeWidth={1.8} />,
          },
          {
            title: "24/7 CUSTOMER SERVICE",
            copy: "Friendly 24/7 customer support",
            icon: <span className="text-3xl text-fg-inverse">🎧</span>,
          },
          {
            title: "MONEY BACK GUARANTEE",
            copy: "We reurn money within 30 days",
            icon: <span className="text-3xl text-fg-inverse">✅</span>,
          },
        ].map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-black/20">
              <div className="flex size-14 items-center justify-center rounded-full bg-black">{feature.icon}</div>
            </div>
            <h4 className="mt-6 font-sans text-title-20-md font-semibold text-fg">{feature.title}</h4>
            <p className="mt-2 font-sans text-title-14 text-fg">{feature.copy}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
