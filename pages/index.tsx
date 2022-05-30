import {Hero} from '@components/Hero';
import {Header} from '@components/Header';
import {Categories} from '@components/Categories';
import {Tiles} from '@components/Tiles';
import {ClothingFavorites} from '@components/ClothingFavorites';
import {WorkspaceCollections} from '@components/WorkspaceCollections';
import {WorkspaceFavorites} from '@components/WorkspaceFavorites';
const IndexPage = ({header}) => (
  <>
    <main className="w-full flex flex-col">
      {header}
      <Hero />
      <Categories />
      <Tiles
        src="/clothing.png"
        title="Eco-friendly"
        desc="We're commited to responsible, sustainable, ethical and ecological manufacturing. Our small scale approach allows us to focus on quality rather than quantity and improve your product. We're doing our best every day to delay the inevitable death of the universe."
        button={{
          text: 'Shop Collection',
          link: '/',
        }}
        bgColor="bg-emerald-900"
        bgOpacity="opacity-50"
      />
      <ClothingFavorites />
      <Tiles />
      <WorkspaceCollections />
      <WorkspaceFavorites />
    </main>
  </>
);

export default IndexPage;
