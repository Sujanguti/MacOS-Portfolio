import {Navbar, Welcome, Dock} from '#components';
import useWindowStore from '#store/window';
import Finder from '#windows/Finder';
import Safari from '#windows/Safari';
import Photos from '#windows/Photos';
import Contact from '#windows/Contact';
import Terminal from '#windows/Terminal';
import Resume from '#windows/Resume';

const App = () => {
  const windows = useWindowStore((state) => state.windows);

  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
      {windows.finder.isOpen && <Finder/>}
      {windows.safari.isOpen && <Safari/>}
      {windows.photos.isOpen && <Photos/>}
      {windows.contact.isOpen && <Contact/>}
      {windows.terminal.isOpen && <Terminal/>}
      {windows.resume.isOpen && <Resume/>}
    </main>
  );
};

export default App;