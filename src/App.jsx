import {Navbar, Welcome, Dock} from '#components';
import useWindowStore from '#store/window';
import {Draggable} from 'gsap/Draggable'
import gsap from 'gsap'; 
import { Finder, Resume, Terminal, Text, Image, Contact } from '#windows';

gsap.registerPlugin(Draggable);

const App = () => {
  const windows = useWindowStore((state) => state.windows);

  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/> 
      <Terminal/>
      <Resume/>
      <Finder/>
      <Text/>
      <Image/>
      <Contact/>
    </main>
  );
};

export default App;