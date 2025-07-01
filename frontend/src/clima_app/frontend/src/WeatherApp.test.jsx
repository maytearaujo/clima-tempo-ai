import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { jest, describe, expect, it } from '@jest/globals';
import WeatherApp from "./WeatherApp";

// Mock das funções fetch
globalThis.fetch = jest.fn((url) => {
  if (url.includes("nominatim")) {
    // Cidade válida
    if (url.includes("Sao%20Paulo")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              lat: "-23.5505",
              lon: "-46.6333",
              display_name: "São Paulo, Brasil",
            },
          ]),
      });
    }
    // Cidade inválida
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  }
  if (url.includes("open-meteo")) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          current_weather: {
            temperature: 25,
            windspeed: 10,
            weathercode: 3,
          },
        }),
    });
  }
  return Promise.reject("URL desconhecida");
});

describe("WeatherApp", () => {
  it("mostra o clima para uma cidade válida", async () => {
    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText(/digite o nome/i), {
      target: { value: "Sao Paulo" },
    });
    fireEvent.click(screen.getByText(/buscar/i));
    await waitFor(() =>
      expect(screen.getByText(/25°C/)).toBeInTheDocument()
    );
    expect(screen.getByText(/Nublado/)).toBeInTheDocument();
    expect(screen.getByText(/São Paulo, Brasil/)).toBeInTheDocument();
  });

  it("mostra mensagem de erro para cidade inválida", async () => {
    render(<WeatherApp />);
    fireEvent.change(screen.getByPlaceholderText(/digite o nome/i), {
      target: { value: "CidadeInexistente" },
    });
    fireEvent.click(screen.getByText(/buscar/i));
    await waitFor(() =>
      expect(
        screen.getByText(/Cidade não encontrada/i)
      ).toBeInTheDocument()
    );
  });
});