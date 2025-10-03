import './App.css';
import { GeminiSummarizer } from './resumer/components/GeminiSummarizer';
import { TanStackProvider1 } from './shared/providers/TanStackProvider1';

function App() {
  return (
    <TanStackProvider1>
      <GeminiSummarizer />
    </TanStackProvider1>
  );
}

export default App;
