import React, { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [showCount, setShowCount] = useState(false);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowCount(false);
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    setCount(countWords(text));
    setShowCount(true);
  };

  const renderResult = () => count > 0 ? (
    <p>Total of <b>{count}</b> word{count > 1 ? 's' : null}</p>
  ) : (
    <p className="warning">Please enter some {text.length > 0 ? 'valid' : null} text</p>
  );

  return (
    <div className="Form">
      <span>Type something below</span>
      <textarea value={text} placeholder="Something..." onChange={handleTextChange} rows={20} cols={80} />
      <button onClick={() => handleButtonClick()}>Count words</button>
      {showCount ? renderResult() : null}
    </div>
  )
}

const countWords = (originalText: string) => {
  const text = originalText.replace(/[\W_]+/g, " ").trim();
  if (text.length === 0) return 0;
  return text.split(/\s+/).length;
}
