import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage(): ReactElement {
  return (
    <div className="mx-auto w-full px-4 pb-20 pt-16 text-center md:px-8 lg:px-0 lg:pb-28 lg:pt-20">
      <Breadcrumb
        variant="muted-trail"
        items={[
          { label: "Home", to: "/" },
          { label: "404 Error" },
        ]}
      />
      <h1 className="mt-20 font-display text-[56px] font-medium leading-[1.05] tracking-[1.4px] text-fg md:text-[74px] md:tracking-[2px] lg:mt-28 lg:text-[110px] lg:leading-[115px] lg:tracking-[3.3px]">
        404 Not Found
      </h1>
      <p className="mx-auto mt-8 max-w-lg font-sans text-title-16 text-fg">
        Your visited page not found. You may go home page.
      </p>
      <Link className="mt-14 inline-block lg:mt-20" to="/">
        <Button type="button" variant="sale" className="min-h-[56px] min-w-[220px] px-8 lg:min-w-[254px]">
          Back to home page
        </Button>
      </Link>
    </div>
  );
}
