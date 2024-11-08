import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar";

const PromotionPage = () => {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const promoRes = await fetch(
                    "http://localhost:5000/api/get-promos"
                );
                const promoData = await promoRes.json();
                setPromotions(promoData);
                console.log(promoData);
            } catch (error) {
                console.error("Error fetching promotions:", error);
            }
        };

        fetchPromotions(); // Fetch promotions data
    }, []);

    // Automatically advance the carousel every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(handleNext, 3000);

        return () => {
            clearInterval(intervalId); // Cleanup on component unmount
        };
    }, [promotions]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + promotions.length) % promotions.length
        );
    };

    return (
        <main>
            <Navbar />
            <section className="carousel-section py-[10rem]">
                <div className="container mx-auto flex flex-col justify-center items-center px-1.5 py-10 h-full">
                    <h1 className="text-4xl font-bold text-center title mb-10">
                        SPECIAL PROMOTIONS
                    </h1>

                    <div className="carousel-container flex flex-col gap-5 items-center h-fit w-full py-10">
                        {/* Display message if there are no promotions */}
                        {promotions.length === 0 ? (
                            <div className="twit text-5xl text-center text-red-500">
                                No promotions available at the moment.
                            </div>
                        ) : (
                            <div className="relative w-full max-w-full h-full">
                                {/* Carousel */}
                                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={handlePrev}
                                        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 z-10"
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 z-10"
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronRight}
                                        />
                                    </button>
                                </div>

                                {/* Promotion content displayed in the center */}
                                {promotions.length > 0 && (
                                    <div className="absolute inset-0 flex justify-center h-full items-center">
                                        <div className="text-center">
                                            {promotions[currentIndex]
                                                .promo_image && (
                                                <img
                                                    src={promotions[
                                                        currentIndex
                                                    ].promo_image.replace(
                                                        /^..\\frontend\\src\\/,
                                                        ".\\src\\"
                                                    )}
                                                    alt={
                                                        promotions[currentIndex]
                                                            .promo_title
                                                    }
                                                    className="mt-5 max-w-full h-96 object-contain rounded-lg" // Limit image height
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PromotionPage;
