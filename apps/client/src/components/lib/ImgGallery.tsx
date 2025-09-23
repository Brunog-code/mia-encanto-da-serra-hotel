import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface HotelImage {
  src: string;
  caption: string;
}

interface IImgGallery {
  filteredImages: HotelImage[];
}

export const ImgGallery = ({ filteredImages }: IImgGallery) => {
  // Achata todas as imagens e adapta para o formato do ImageGallery
  const galleryItems = filteredImages.map((item) => ({
    original: item.src, // imagem principal
    thumbnail: item.src, // miniatura
    description: item.caption, // legenda
  }));

  return (
    <div className="w-full md:w-1/3 max-w-4xl mx-auto py-10 ">
      <ImageGallery
        items={galleryItems}
        showPlayButton={false} //remove autoplay
        showFullscreenButton={true} //habilita fullscreen/lightbox
        showNav={true} //setas de navegação
      />
    </div>
  );
};
