import { useState, type FormEvent, type ReactElement } from "react";
import { Mail, PhoneCall } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

export default function ContactPage(): ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <div className="mx-auto w-full  px-4 py-10 lg:px-site">
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: "Contact" },
        ]}
      />
      <div className="mt-12 grid grid-cols-1 gap-[30px] lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-control bg-surface p-10 shadow-card">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-sale text-fg-inverse">
                  <PhoneCall className="size-5" strokeWidth={1.75} />
                </span>
                <p className="font-sans text-title-16 font-medium text-fg">Call To Us</p>
              </div>
              <p className="font-sans text-title-14 text-fg">
              We are available 24/7, 7 days a week.
            </p>
              <p className="font-sans text-title-14 text-fg">Phone: +8801611112222</p>
            </div>
            <div className="h-px bg-fg opacity-40" />
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-sale text-fg-inverse">
                  <Mail className="size-5" strokeWidth={1.75} />
                </span>
                <p className="font-sans text-title-16 font-medium text-fg">Write To US</p>
              </div>
              <p className="font-sans text-title-14 text-fg">
              Fill out our form and we will contact you within 24 hours.
            </p>
              <p className="font-sans text-title-14 text-fg">Emails: customer@exclusive.com</p>
              <p className="font-sans text-title-14 text-fg">Emails: support@exclusive.com</p>
            </div>
          </div>
        </aside>
        <form
          className="space-y-8 rounded-control bg-surface p-8 shadow-card lg:p-10"
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="sr-only" htmlFor="contact-name">
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none placeholder:opacity-50 focus-visible:ring-2 focus-visible:ring-fg"
              placeholder="Your Name *"
            />
            <label className="sr-only" htmlFor="contact-email">
              Your Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none placeholder:opacity-50 focus-visible:ring-2 focus-visible:ring-fg"
              placeholder="Your Email *"
            />
            <label className="sr-only" htmlFor="contact-phone">
              Your Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none placeholder:opacity-50 focus-visible:ring-2 focus-visible:ring-fg"
              placeholder="Your Phone *"
            />
          </div>
          <label className="sr-only" htmlFor="contact-message">
            Your Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={8}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="h-[207px] w-full resize-none rounded-control bg-surface-muted p-4 font-sans text-title-16 text-fg outline-none placeholder:opacity-50 focus-visible:ring-2 focus-visible:ring-fg"
            placeholder="Your Massage"
          />
          <div className="flex justify-end">
            <Button type="submit" variant="sale" className="px-12 py-4">
              Send Massage
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
