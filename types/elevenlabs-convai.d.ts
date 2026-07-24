import type { HTMLAttributes } from "react";

declare global {
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
