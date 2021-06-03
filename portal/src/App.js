
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
