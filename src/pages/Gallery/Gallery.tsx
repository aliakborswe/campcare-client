import Wrapper from "@/components/common/Wrapper";
import img1 from "@/assets/images/1-1.png";
import img2 from "@/assets/images/1-1.png";
import img3 from "@/assets/images/1-1.png";
import img4 from "@/assets/images/1-1.png";
import img5 from "@/assets/images/1-1.png";
import img6 from "@/assets/images/1-1.png";
import img8 from "@/assets/images/1-1.png";
import img7 from "@/assets/images/1-1.png";

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: img1,
    alt: "Medical team providing free check-ups",
    caption: "Doctors and nurses conducting free health check-ups at the camp.",
  },
  {
    src: img2,
    alt: "Volunteers assisting patients",
    caption: "Camp volunteers guiding patients for consultations and services.",
  },
  {
    src: img3,
    alt: "Doctors prescribing medication",
    caption:
      "A doctor advising a patient on medications and treatment at the camp.",
  },
  {
    src: img4,
    alt: "Health awareness session",
    caption:
      "Community members attending a health awareness seminar at the camp.",
  },
  {
    src: img5,
    alt: "Medical supply distribution",
    caption:
      "Volunteers distributing free medicines and health kits to patients.",
  },
  {
    src: img6,
    alt: "Blood donation camp",
    caption:
      "People donating blood to support emergency and critical care needs.",
  },
  {
    src: img7,
    alt: "Child health check-up",
    caption: "Pediatricians examining and vaccinating children at the camp.",
  },
  {
    src: img8,
    alt: "Community health outreach",
    caption:
      "Medical professionals and volunteers engaging with the local community.",
  },
];

const Gallery = () => {
  return (
    <Wrapper>
      <div className='text-center mb-12'>
        <h2 className='text-center text-3xl font-bold mb-4 bg-accent w-[320px] mx-auto rounded-br-full rounded-tl-full text-white dark:text-black py-2 '>
          Activity Gallery
        </h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          Explore a collection of vibrant moments and activities that showcase
          our commitment to creating a positive impact. Dive into the gallery to
          witness the energy and dedication behind our initiatives.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {galleryItems.map((item, index) => (
          <div key={index} className='group'>
            <div className='relative aspect-[4/3] overflow-hidden rounded-lg mb-3'>
              <img
                src={item.src}
                alt={item.alt}
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <p className='text-sm text-center text-muted-foreground'>
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Gallery;
