import { render, screen } from "@testing-library/react";

import Logo from ".";

describe("Logo component", () => {
  describe("When a logo is created", () => {
    it("the logo contain this path hash value 6c3b1e1b0a4e3b9e6e3f1e3f1e3b1e3", () => {
      render(<Logo />);
      expect(screen.getByTestId("logo").getAttribute("width")).toEqual("130");
    });
  });
});

describe("Logo component", () => {
  describe("Quand le logo component et créé", () => {
    it("La valeur par defaut de l'attribut width et de 130", () => {
      render(<Logo />);
      expect(screen.getByTestId("logo").getAttribute("width")).toEqual("130");
    });
  });
  describe("Quand le logo component et créé avec la valeur pour size egal large l'attribut width et de 160", () => {
    it("", () => {
      render(<Logo size="large" />);
      expect(screen.getByTestId("logo").getAttribute("width")).toEqual("160");
    });
  });
});
