export const questions = [
  {
    id: "q1",
    text: "Which language runs natively in web browsers?",
    options: [
      { id: "a", text: "Python" },
      { id: "b", text: "JavaScript" },
      { id: "c", text: "C++" },
      { id: "d", text: "Java" },
    ],
    correctOptionId: "b",
    explanation:
      "JavaScript runs natively in modern browsers and can interact with the DOM.",
  },
  {
    id: "q2",
    text: "What does HTML primarily define?",
    options: [
      { id: "a", text: "The structure of a web page" },
      { id: "b", text: "The database of a website" },
      { id: "c", text: "The server operating system" },
      { id: "d", text: "The network connection" },
    ],
    correctOptionId: "a",
    explanation:
      "HTML defines the structure and semantic content of a web page.",
  },
  {
    id: "q3",
    text: "Which CSS property changes text color?",
    options: [
      { id: "a", text: "font-style" },
      { id: "b", text: "background-color" },
      { id: "c", text: "color" },
      { id: "d", text: "text-align" },
    ],
    correctOptionId: "c",
    explanation: "The color property controls the foreground color of text.",
  },
  {
    id: "q4",
    text: "Which DOM method selects an element by its ID?",
    options: [
      { id: "a", text: "document.querySelectorAll()" },
      { id: "b", text: "document.getElementById()" },
      { id: "c", text: "document.createElement()" },
      { id: "d", text: "document.write()" },
    ],
    correctOptionId: "b",
    explanation:
      "getElementById() returns the element matching the specified ID.",
  },
  {
    id: "q5",
    text: "Which array method transforms each item into a new array item?",
    options: [
      { id: "a", text: "forEach()" },
      { id: "b", text: "find()" },
      { id: "c", text: "map()" },
      { id: "d", text: "push()" },
    ],
    correctOptionId: "c",
    explanation: "map() transforms each item and returns a new array.",
  },
];
