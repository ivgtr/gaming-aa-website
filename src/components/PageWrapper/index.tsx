import React from "react";

export const PageWrapper: React.FC = ({ children }) => {
  return <div className="App container mx-auto py-4">{children}</div>;
};
