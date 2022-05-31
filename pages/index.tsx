import {Hero} from '@components/Hero';
import {Header} from '@components/Header';
import {Categories} from '@components/Categories';
import {Tiles} from '@components/Tiles';
import {ClothingFavorites} from '@components/ClothingFavorites';
import {WorkspaceCollections} from '@components/WorkspaceCollections';
import {WorkspaceFavorites} from '@components/WorkspaceFavorites';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {Categories as ProductCategories} from '@interfaces/Products';

export const getStaticProps: GetStaticProps = async context => {
  //I'm simulating an DB call, this code should be replaced by a real DB call
  //And since this is a static page, this code isn't shipped to production
  //Maybe you are asking, why don't call our built-in Next API here?
  //It's because that API is not available in the build step.
  //So, this will work fine for this example, but it's not a good practice and should be avoided.

  const clothingList = [
    {
      src: '/favorite-1.jpg',
      price: 19.99,
      name: 'Black Basic Tee',
    },
    {
      src: '/favorite-2.jpg',
      price: 19.99,
      name: 'Green Tea Basic Tee',
    },
    {
      src: '/favorite-3.jpg',
      price: 39.99,
      name: 'Mandarina Basic Tee',
    },
  ];

  const workspaceList = [
    {
      colors: [
        {
          name: 'black',
          hex: '#000000',
        },
        {
          name: 'gold',
          hex: '#e9d69d',
        },
        {
          name: 'silver',
          hex: '#c0c0c0',
        },
      ],
      name: 'Machined Pen',
      price: 20,
      src: '/pencil.png',
    },
    {
      colors: [
        {
          name: 'matte black',
          hex: '#353132',
        },
        {
          name: 'porcenlain',
          hex: '#b8a086',
        },
      ],
      name: 'Earthen Mug',
      price: 18,
      src: '/mug.png',
    },
    {
      colors: [
        {
          name: 'natural',
          hex: '#ecc19e',
        },
        {
          name: 'black',
          hex: '#000000',
        },
        {
          name: 'brown',
          hex: '#884941',
        },
      ],
      name: 'Journal Bundle',
      price: 90,
      src: '/journal-bundle.png',
    },
    {
      colors: [
        {
          name: 'black',
          hex: '#000000',
        },
        {
          name: 'natural',
          hex: '#ecc19e',
        },
        {
          name: 'brown',
          hex: '#884941',
        },
      ],
      name: 'Journal',
      price: 30,
      src: '/journal.png',
    },
  ];

  return {
    props: {
      clothingList,
      workspaceList,
    },
  };
};

const IndexPage = ({
  header,
  clothingList,
  workspaceList,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
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
      <ClothingFavorites list={clothingList} />
      <Tiles />
      <WorkspaceCollections />
      <WorkspaceFavorites list={workspaceList} />
    </main>
  </>
);

export default IndexPage;
