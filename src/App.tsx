import React, { Component } from "react";
import { Box } from "./form/Box";

/**
 * Main Component
 */
export class App extends Component<{}, {}> {

  public render() {
    return (
      <Box
        title="Gift Cards"
        question="Do you have a gift card?"
      />
    );
  }

}
