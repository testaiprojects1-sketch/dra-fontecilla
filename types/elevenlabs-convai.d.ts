import type { HTMLAttributes } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": HTMLAttributes<HTMLElement> & {
        "agent-id"?: string;
        "dynamic-variables"?: string;
        "signed-url"?: string;
      };
    }
  }
}

export {};
