import { html, render } from 'lit-html';
import logo from './logo2.svg';
import { Ecocity_backend } from '../../declarations/Ecocity_backend';

class App {
  greeting = '';

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.greeting = await Ecocity_backend.greet(name);
    this.#render();
  };

  #render() {
   
    render(body, document.getElementById('root'));
    document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit);
  }
}

export default App;
