import './App.css';
import { GeminiResumer } from './resumer/components/GeminiResumer';
import { TanStackProvider1 } from './shared/providers/TanStackProvider1';

function App() {
  return (
    <TanStackProvider1>
      <GeminiResumer />
    </TanStackProvider1>
  );
}

export default App;
