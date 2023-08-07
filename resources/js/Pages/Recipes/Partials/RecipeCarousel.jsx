import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function RecipeCarousel({ recipe }) {

    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            {recipe.images && recipe.images.map((image, index) => {
                return (
                    <img src={'/storage/' + image.image}
                        alt={recipe.name}
                        key={recipe.id}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                )
            })}
        </Carousel>
    )
}
