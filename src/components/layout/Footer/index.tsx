export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {currentYear} Ternak Ayam Broiler
        </p>
      </div>
    </footer>
  );
}

export default Footer;
