import './App.css';
import { Video } from './components/Video';
// import videoIds from './videoIds.json'

function App() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4 text-center text-red-700'>YouTube Shorts</h1>
      <Video />
    </div>
  );
}

export default App;
