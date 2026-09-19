export function PainelFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-[1360px] px-4 py-6 md:px-6">
        <p className="text-sm text-muted-foreground">
          Confirm Event · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
