import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  const renderComponent = () => render(<App />)

  test('renders properly', () => {
    const { container } = renderComponent();

    expect(container).toHaveTextContent(/Word Counter/i);
    expect(container).toHaveTextContent(/Type something below/i);
    expect(container).toHaveTextContent(/COUNT WORDS/i);
  });

  test('counts words', () => {
    const { container } = renderComponent();

    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: {value: "Lorem ipsum"} });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(container).toHaveTextContent(/Total of 2 words/i);
  });

  test('counts single word', () => {
    const { container } = renderComponent();

    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: {value: "Lorem"} });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(container).toHaveTextContent(/Total of 1 word/i);
  });

  test('displays instructions when clicking button with no text', () => {
    const { container } = renderComponent();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(container).toHaveTextContent(/Please enter some text/i);
    expect(container).not.toHaveTextContent(/Total of (.*) word/i);
  });
});
