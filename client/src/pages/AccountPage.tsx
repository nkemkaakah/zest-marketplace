import { useEffect, useMemo, useState, type ReactElement } from "react";
import { useAuthStore } from "@/store";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";

export default function AccountPage(): ReactElement {
  const user = useAuthStore((state) => state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const fullName = user.fullName?.trim() ?? "";
    const [rawFirstName, ...restNames] = fullName.split(/\s+/).filter(Boolean);
    setFirstName(rawFirstName ?? "");
    setLastName(restNames.join(" "));
    setMail(user.email);
  }, [user]);

  const welcomeName = useMemo(() => {
    if (user?.fullName && user.fullName.trim().length > 0) {
      return user.fullName;
    }
    return user?.email ?? "User";
  }, [user]);

  return (
    <div className="mx-auto w-full px-4 py-20 lg:px-site">
      <Breadcrumb
        variant="muted-trail"
        items={[
          { label: "Home", to: "/" },
          { label: "My Account" },
        ]}
      />
      <div className="mt-8 flex justify-end">
        <p className="font-sans text-title-14 text-fg">
          Welcome! <span className="text-sale">{welcomeName}</span>
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-[100px]">
        <aside className="space-y-8 font-sans text-title-16 text-fg">
          <div>
            <p className="font-medium">Manage My Account</p>
            <ul className="mt-4 space-y-2 pl-6">
              <li className="text-sale">My Profile</li>
              <li className="opacity-50">Address Book</li>
              <li className="opacity-50">My Payment Options</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">My Orders</p>
            <ul className="mt-4 space-y-2 pl-6">
              <li className="opacity-50">My Returns</li>
              <li className="opacity-50">My Cancellations</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">My WishList</p>
          </div>
        </aside>
        <div className="rounded-control bg-surface p-8 shadow-card lg:p-10">
          <h1 className="font-sans text-title-20-md text-sale">Edit Your Profile</h1>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[50px]">
            <label className="flex flex-col gap-2 font-sans text-title-16 text-fg">
              <span>First Name</span>
              <input
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 font-sans text-title-16 text-fg">
              <span>Last Name</span>
              <input
                name="lastName"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 font-sans text-title-16 text-fg">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={mail}
                readOnly
                className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 font-sans text-title-16 text-fg">
              <span>Address</span>
              <input
                name="address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none"
              />
            </label>
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex flex-col gap-2 font-sans text-title-16 text-fg">
              <span>Password Changes</span>
              <input
                name="currentPwd"
                type="password"
                placeholder="Current Passwod"
                value={currentPwd}
                onChange={(e) => {
                  setCurrentPwd(e.target.value);
                }}
                className="h-[50px] rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none placeholder:text-fg placeholder:opacity-50"
              />
            </label>
            <input
              name="newPwd"
              type="password"
              placeholder="New Passwod"
              value={newPwd}
              onChange={(e) => {
                setNewPwd(e.target.value);
              }}
              className="h-[50px] w-full rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none placeholder:text-fg placeholder:opacity-50"
            />
            <input
              name="confirmPwd"
              type="password"
              placeholder="Confirm New Passwod"
              value={confirmPwd}
              onChange={(e) => {
                setConfirmPwd(e.target.value);
              }}
              className="h-[50px] w-full rounded-control bg-surface-muted px-4 font-sans text-title-16 text-fg outline-none placeholder:text-fg placeholder:opacity-50"
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-8">
            <Button variant="ghost" type="button" className="px-0">
              Cancel
            </Button>
            <Button type="button" variant="sale" className="px-12 py-4">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
