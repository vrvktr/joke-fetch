import React from 'react'

const App = () => {

  const [errorMsg, setErrorMsg] = React.useState('');
  const [joke, setJoke] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) {
        throw new Error(`Joke API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setJoke(data);
      setErrorMsg('');
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('');
      setErrorMsg('Could not fetch a joke. Try again.');
    } finally {
      setLoading(false);
    }
  }



  return (
    <main className="app-shell container-fluid d-flex justify-content-center align-items-center">
      <section className="joke-card card shadow-sm text-center w-100">
        <div className="card-body d-flex flex-column align-items-center gap-3">
          <h1 className="card-title h3 fw-bold mb-0">Random Joke</h1>
          <p className="card-text mb-0">
            Click the button to fetch a fresh one.
          </p>
          <button
            className="btn btn-primary"
            onClick={fetchJoke}
            disabled={isLoading}
          >
            {isLoading ? 'Fetching...' : 'Fetch joke'}
          </button>
          {joke && (
            <div className="w-100">
              <p className="mb-2">{joke?.setup || ''}</p>
              <p className="fw-semibold mb-0">{joke?.punchline || ''}</p>
            </div>
          )}
          {errorMsg && (
            <div className="text-danger" role="alert">
              <p className="mb-2">{errorMsg}</p>
              <button onClick={fetchJoke} className="btn btn-link p-0">
                Try again
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App