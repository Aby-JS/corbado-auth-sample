import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "corbado-auth": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { conditional: string },
        HTMLElement
      >;
    }
  }
}
