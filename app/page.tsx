import ScrollWaveField from "./components/background";
import TerminalCard from "./components/terminal";

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 w-full min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="relative flex flex-1 w-full min-h-screen justify-center overflow-hidden ">
        <div className="absolute inset-0 z-0">
          <ScrollWaveField />
        </div>
        <div className="relative z-10 my-25">
          <TerminalCard />
        </div>
      </main>
    </div>
  );
}
