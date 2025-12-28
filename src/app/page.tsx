import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main
      className={"relative flex h-screen flex-col items-center justify-center"}
    >
      <h1 className={"font-medium text-7xl tracking-tighter"}>
        ads-campaign
      </h1>
      <p className={"my-6 text-center text-base"}>
        ads-campaign assignment
      </p>
      <ThemeToggle />
    </main>
  );
}
