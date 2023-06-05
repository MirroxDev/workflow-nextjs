import "../../globals.css";
import { Roboto } from "next/font/google";
import ToasterProvider from "../../providers/ToasterProvider";
import getCurrentUser from "../../actions/getCurrentUser";
import DNavbar from "@/app/components/dashboard/DNavbar";
import DMenu from "@/app/components/dashboard/DMenu";
import DContent from "@/app/components/dashboard/DContent";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "WorkFlow",
  description: "Generated by create next app",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <div className="flex flex-row items-center justify-center h-screen">
        Ви не увійшли до системи!
      </div>
    );
  }

  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToasterProvider />
        <DNavbar currentUser={currentUser} />
        <div className="grid grid-cols-[250px_1fr]">
          <DMenu currentUser={currentUser} />
          <DContent>{children}</DContent>
        </div>
      </body>
    </html>
  );
}
