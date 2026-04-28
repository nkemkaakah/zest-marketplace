import { useState, type FormEvent, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function SignupPage(): ReactElement {
  const [name, setName] = useState("");
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
            src="https://www.figma.com/api/mcp/asset/6b4591ee-2c70-48e2-8a00-78d0f3979da5"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex w-full flex-1 items-center justify-center px-4 lg:px-8">
          <div className="w-full max-w-[370px]">
            <h1 className="font-display text-heading-32 tracking-[1.44px] text-fg">
              Create an account
            </h1>
            <p className="mt-6 font-sans text-title-16 text-fg">
              Enter your details below
            </p>
            <form className="mt-12 flex flex-col gap-10" onSubmit={onSubmit}>
              <label className="flex flex-col gap-2">
                <span className="font-sans text-title-16 text-fg opacity-40">
                  Name
                </span>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  autoComplete="name"
                  className="border-b border-black/50 bg-transparent pb-2 font-sans text-title-16 text-fg outline-none focus:border-black"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-sans text-title-16 text-fg opacity-40">
                  Email or Phone Number
                </span>
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="email"
                  className="border-b border-black/50 bg-transparent pb-2 font-sans text-title-16 text-fg outline-none focus:border-black"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-sans text-title-16 text-fg opacity-40">
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  autoComplete="new-password"
                  className="border-b border-black/50 bg-transparent pb-2 font-sans text-title-16 text-fg outline-none focus:border-black"
                />
              </label>
              <div className="flex flex-col gap-4">
                <Button type="submit" variant="sale" className="w-full py-4">
                  Create Account
                </Button>
                <button
                  type="button"
                  className="flex h-14 w-full items-center justify-center gap-4 rounded-control border border-hairline border-border-outline font-sans text-title-16 text-fg"
                >
                  <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.44a5.5 5.5 0 0 1-2.39 3.6v2.99h3.87c2.27-2.1 3.57-5.2 3.57-8.62Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.87-2.99c-1.07.72-2.44 1.15-4.07 1.15-3.12 0-5.77-2.11-6.71-4.95H1.3v3.09A11.99 11.99 0 0 0 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.29 14.31A7.2 7.2 0 0 1 4.92 12c0-.8.14-1.57.37-2.31V6.6H1.3A12 12 0 0 0 0 12c0 1.94.47 3.77 1.3 5.4l4-3.09Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.77c1.76 0 3.34.6 4.59 1.8l3.44-3.44A11.49 11.49 0 0 0 12 0 11.99 11.99 0 0 0 1.3 6.6l4 3.09C6.23 6.88 8.88 4.77 12 4.77Z"
                    />
                  </svg>
                  <span>Sign up with Google</span>
                </button>
                <p className="mt-4 text-center font-sans text-title-16 text-fg opacity-70">
                  Already have account?{" "}
                  <Link
                    className="font-medium underline underline-offset-4"
                    to="/login"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
