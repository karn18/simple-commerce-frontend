export default function Footer() {
  return (
    <footer className="w-full h-30 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex w-full h-full max-w-3xl justify-center items-center gap-4 bg-white px-4 dark:bg-black sm:px-8 mx-auto">
        <p>
          <span className="font-medium text-foreground">kvnz shop</span>
          <span aria-hidden="true"> · </span>© 2026
        </p>
      </div>
    </footer>
  );
}
