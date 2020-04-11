import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repository ${Date.now()}`,
      url: "Diego.com.br",
      techs: "[Node.js, React.js]"
    });
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 400){
      console.log('invalid id');
      return;
    }

    const repositoryIndex= repositories.findIndex(repository => repository.id === id);

    let newRepositories = repositories.splice(repositoryIndex, 1);

    newRepositories = repositories.filter(repository=> repository !== newRepositories);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map
            (repository => <div key = {repository.id}>{repository.title}
            <li>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
            </div>)
          }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
