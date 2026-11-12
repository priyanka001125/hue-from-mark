import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ImageUp, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import snapcutLogo from "@/assets/snapcut-ai-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SnapCut AI — Effortless background removal" },
      { name: "description", content: "Remove image backgrounds with SnapCut AI." },
      { property: "og:title", content: "SnapCut AI — Effortless background removal" },
      { property: "og:description", content: "Remove image backgrounds with SnapCut AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  function acceptFile(file?: File) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Choose a PNG, JPG, or WEBP image.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("This image is larger than 10 MB.");
      return;
    }
    setError("");
    setFileName(file.name);
  }

  function openFilePicker() {
    fileInput.current?.click();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <a href="#home" aria-label="SnapCut AI home" className="flex items-center">
            <img
              src={snapcutLogo.url}
              alt="SnapCut AI"
              className="h-[68px] w-[120px] object-contain"
            />
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
          </div>
          <a
            href="#upload"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-background transition hover:bg-primary/90"
          >
            Get started <ArrowRight className="size-4" />
          </a>
        </nav>
      </header>

      <section
        id="home"
        className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 md:min-h-[690px] md:grid-cols-[1fr_0.94fr] md:gap-8 md:pb-24 md:pt-16"
      >
        <div className="relative z-10 max-w-[610px]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-neon-cyan/25 bg-secondary/80 px-3.5 py-2 text-xs font-medium text-neon-cyan">
            <Sparkles className="size-3.5" /> A cleaner cut, in seconds
          </div>
          <h1 className="max-w-[590px] text-5xl font-bold leading-[1.05]">
            Remove backgrounds.
            <br />
            <span className="bg-gradient-to-r from-neon-cyan via-electric-blue to-neon-magenta bg-clip-text text-transparent">
              Keep the magic.
            </span>
          </h1>
          <p className="mt-6 max-w-[490px] text-base leading-7 text-muted-foreground sm:text-lg">
            Turn any image into a clean, transparent PNG with one click. No complicated editing. No
            design skills required.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#upload"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-gradient-to-r from-electric-blue to-neon-cyan px-5 text-sm font-semibold text-background shadow-[0_0_30px_-8px_var(--neon-cyan)] transition hover:brightness-110"
            >
              Remove background <ArrowRight className="size-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-card/60 px-5 text-sm font-medium text-foreground transition hover:border-neon-cyan/40"
            >
              See how it works
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-neon-cyan" /> No editing experience
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-neon-cyan" /> Transparent PNG output
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] md:justify-self-end">
          <div id="upload" className="relative border border-border bg-card/70 p-3 shadow-2xl snapcut-glow sm:p-4">
            <div className="flex items-center justify-between border-b border-border px-2 pb-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="size-2 rounded-full bg-neon-cyan shadow-[0_0_10px_var(--neon-cyan)]" />
                Background remover
              </div>
              <span className="text-xs text-muted-foreground">PNG · JPG · WEBP</span>
            </div>
            <div
              aria-label="Select or drop an image"
              role="button"
              tabIndex={0}
              className="mt-3 flex min-h-[290px] cursor-pointer flex-col items-center justify-center border border-dashed border-neon-cyan/30 bg-surface-base/80 px-5 py-8 text-center transition hover:border-neon-cyan/70 hover:bg-surface-raised/70 sm:min-h-[340px]"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                acceptFile(event.dataTransfer.files[0]);
              }}
              onClick={openFilePicker}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openFilePicker();
                }
              }}
            >
              <input
                ref={fileInput}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => acceptFile(event.currentTarget.files?.[0])}
              />
              <div className="mb-5 grid size-14 place-items-center rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
                <ImageUp className="size-6" />
              </div>
              <h2 className="max-w-full break-words text-lg font-semibold">
                {fileName || "Drop an image to get started"}
              </h2>
              <p className="mt-2 max-w-[280px] text-sm leading-6 text-muted-foreground">
                Drag and drop your image here, or choose a file from your device.
              </p>
              <Button
                type="button"
                className="mt-5 bg-electric-blue text-primary-foreground shadow-[0_0_24px_-8px_var(--electric-blue)] hover:bg-electric-blue/90"
                onClick={(event) => {
                  event.stopPropagation();
                  openFilePicker();
                }}
              >
                Choose an image
              </Button>
              <p className="mt-4 text-xs text-muted-foreground">
                PNG, JPG or WEBP <span className="mx-1 text-neon-violet">·</span> Up to 10 MB
              </p>
              {error && (
                <p role="alert" className="mt-3 text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 px-2 pt-3 text-xs text-muted-foreground">
              <Check className="size-3.5 text-success" /> Your images are processed securely
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border/70 bg-surface-base/70">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-semibold uppercase text-neon-cyan">Simple by design</p>
            <h2 className="mt-3 text-3xl font-bold">Three steps. One perfect cut.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {[
              ["01", "Upload your image", "Choose a photo from your device. We support PNG, JPG and WEBP."],
              ["02", "Let AI do the work", "SnapCut finds your subject and separates it from the background."],
              ["03", "Download and create", "Save a transparent PNG, ready for wherever you need it."],
            ].map(([number, title, description], index) => (
              <article key={number} className="relative border-t border-border pt-5">
                <span
                  className={`text-sm font-semibold ${index === 1 ? "text-neon-magenta" : index === 2 ? "text-neon-orange" : "text-neon-cyan"}`}
                >
                  {number}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-neon-orange">Made for the details</p>
            <h2 className="mt-3 max-w-md text-3xl font-bold">
              A little less editing. A lot more creating.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Clean edges, transparent results, and a workflow that stays out of your way.
            </p>
          </div>
          <div className="grid gap-x-8 sm:grid-cols-2">
            {[
              ["One-click removal", "Remove the background without opening a complex editor."],
              ["Smart subject detection", "Keep the person, product, or details that matter."],
              ["Transparent PNG", "Download a cutout ready for your next project."],
              ["Quick and simple", "Go from image to polished cutout in moments."],
            ].map(([title, description], index) => (
              <article key={title} className="border-t border-border py-5">
                <div className="flex items-center gap-2">
                  <Sparkles
                    className={`size-4 ${index % 2 ? "text-neon-magenta" : "text-neon-cyan"}`}
                  />
                  <h3 className="text-sm font-semibold">{title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-border/70 bg-surface-base/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-neon-cyan">Start creating</p>
            <h2 className="mt-2 text-2xl font-bold">
              Your next image is one click away.
            </h2>
          </div>
          <a
            href="#upload"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Try SnapCut AI <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src={snapcutLogo.url}
              alt="SnapCut AI"
              className="h-[42px] w-[74px] object-contain"
            />
            <span>Effortless background removal.</span>
          </div>
          <span>© 2026 SnapCut AI</span>
        </div>
      </footer>
    </main>
  );
}