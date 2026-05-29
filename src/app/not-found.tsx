import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface">
      <div className="text-center px-4">
        <p className="text-8xl font-bold text-accent/20 mb-4">404</p>
        <h1 className="text-3xl font-bold text-primary mb-3">
          Page Not Found
        </h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to discovering beautiful furniture.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg">Back to Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
