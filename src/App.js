import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    try {
      const response = await api.post('/repositories', {
        title: "ola",
        url: "https://github.com/eduqg/gostack-template-conceitos-reactjs",
        techs: ["NodeJS", "ReactJS"]
      })
      setRepositories([...repositories, response.data])

    } catch (error) {
      console.log('Error to post')
    }

  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)
      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch (error) {
      console.log('Error to delete')
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button
              onClick={() => handleRemoveRepository(repository.id)}
            >Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
