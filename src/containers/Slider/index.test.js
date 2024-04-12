import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";

jest.useFakeTimers();

const data = {
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};

describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });

  it("sorts events by date in descending order", () => {
    const mockData = {
      focus: [
        {
          title: "Event 1",
          description: "Description 1",
          date: "2022-02-01T00:00:00.000Z",
          cover: "/path/to/image1.png",
        },
        {
          title: "Event 2",
          description: "Description 2",
          date: "2022-03-01T00:00:00.000Z",
          cover: "/path/to/image2.png",
        },
      ],
    };
    const { container } = render(
      <DataProvider value={{ data: mockData }}>
        <Slider />
      </DataProvider>
    );

    const eventTitles = container.querySelectorAll(".SlideCard h3");
    const eventDates = Array.from(eventTitles).map(
      (title) => title.textContent
    );
    const sortedDates = [...eventDates].sort(
      (a, b) => new Date(b) - new Date(a)
    );

    expect(eventDates).toEqual(sortedDates);
  });

  it("changes index every 5 seconds", () => {
    const mockData = {
      focus: [
        {
          title: "Event 1",
          description: "Description 1",
          date: "2022-02-01T00:00:00.000Z",
          cover: "/path/to/image1.png",
        },
        {
          title: "Event 2",
          description: "Description 2",
          date: "2022-03-01T00:00:00.000Z",
          cover: "/path/to/image2.png",
        },
      ],
    };

    const { container } = render(
      <DataProvider value={{ data: mockData }}>
        <Slider />
      </DataProvider>
    );

    const initialIndex = container.querySelector(".SlideCard--display");

    jest.advanceTimersByTime(5000);
    const newIndex = container.querySelector(".SlideCard--display");
  });
});
