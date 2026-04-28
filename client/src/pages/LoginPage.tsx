import { useState, type FormEvent, type ReactElement } from "react";
import { Button } from "@/components/ui/Button";

export default function LoginPage(): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  }

  return (
    <section className="w-full pb-24 pt-10 lg:pb-36 lg:pt-14">
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-stretch">
        <div className="hidden h-[781px] overflow-hidden rounded-r-control bg-[#CBE4E8] lg:block lg:basis-[55%]">
          <img
            src="https://www.figma.com/api/mcp/asset/4b48b727-f830-489d-a417-5a9057cdc7f7"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex w-full flex-1 items-center justify-center px-4 lg:px-8">
          <div className="w-full max-w-[370px]">
          <h1 className="font-display text-heading-32 tracking-[1.44px] text-fg">Log in to Exclusive</h1>
          <p className="mt-6 font-sans text-title-16 text-fg">Enter your details below</p>
          <form className="mt-12 flex flex-col gap-10" onSubmit={onSubmit}>
            <label className="flex flex-col gap-2">
              <span className="font-sans text-title-16 text-fg opacity-40">Email or Phone Number</span>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="username"
                className="border-b border-black/50 bg-transparent pb-2 font-sans text-title-16 text-fg outline-none focus:border-black"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-sans text-title-16 text-fg opacity-40">Password</span>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
                className="border-b border-black/50 bg-transparent pb-2 font-sans text-title-16 text-fg outline-none focus:border-black"
              />
            </label>
            <div className="mt-2 flex items-center justify-between gap-6">
              <Button type="submit" variant="sale" className="min-w-[143px] px-12 py-4">
                Log In
              </Button>
              <button type="button" className="font-sans text-title-16 text-sale">
                Forget Password?
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
}
