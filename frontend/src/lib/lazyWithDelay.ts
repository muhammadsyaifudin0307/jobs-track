// src/lib/lazyWithDelay.ts
import { lazy } from "react";

const minDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function lazyWithDelay<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  delay = 600, // ms minimum skeleton tampil
) {
  return lazy(() =>
    Promise.all([factory(), minDelay(delay)]).then(([module]) => module),
  );
}
