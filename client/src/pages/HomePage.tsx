import { useEffect, useState, type ReactElement } from "react";
import { fetchHealth } from "@/services/health";
import type { HealthResponse } from "@/types/api";

export default function HomePage(): ReactElement {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetchHealth();
        if (!cancelled) {
          setData(res);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-neutral-500">Checking API…</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Ready to build</h1>
      <p className="text-neutral-600">
        API health:{" "}
        <code className="rounded bg-neutral-100 px-2 py-1 text-sm">
          {JSON.stringify(data)}
        </code>
      </p>
      <p className="text-sm text-neutral-500">
        Run <code className="font-mono">npm run dev</code> from the repo root to
        start client and server together.
      </p>
    </div>
  );
}
