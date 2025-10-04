import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface HotelImage {
  category: string;
  title: string;
  url: string;
}

interface IImgGallery {
  filteredImages: HotelImage[];
}

export const ImgGallery = ({ filteredImages }: IImgGallery) => {
  // Achata todas as imagens e adapta para o formato do ImageGallery
  const galleryItems = filteredImages.map((item) => ({
    original: item.url, // imagem principal
    thumbnail: item.url, // miniatura
  }));

  return (
    <div className="mx-auto py-10 w-full md:w-1/3 max-w-4xl">
      <ImageGallery
        items={galleryItems}
        showPlayButton={false} //remove autoplay
        showFullscreenButton={true} //habilita fullscreen/lightbox
        showNav={true} //setas de navegação
      />
    </div>
  );
};
