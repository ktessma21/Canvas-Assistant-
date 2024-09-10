import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import SignupLoginForm from './SignupLoginForm';
import './style.css';

// Floating Books JSON
const books = [
  { imageUrl: 'book1.png', width: 50, height: 50 },
  { imageUrl: 'book2.png', width: 50, height: 50 },
  { imageUrl: 'book3.png', width: 50, height: 50 }
];

function App() {
  useEffect(() => {
    const bookContainer = document.getElementById('root');
    books.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.className = 'floating-book';
      bookElement.style.backgroundImage = `url(${book.imageUrl})`;
      bookContainer.appendChild(bookElement);
    });
  }, []);

  return <SignupLoginForm />;
}

ReactDOM.render(<App />, document.getElementById('root'));
