import ScrollWaveField from "./components/background";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 w-full min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between">
        <ScrollWaveField />
      </main>
    </div>
  );
}
