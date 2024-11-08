import { useState } from "react";
import Navbar from "../../components/Navbar";

import Batangas from "../../assets/stores/batangas_location.png";
import Manila from "../../assets/stores/metro_manila_location.png";
import Quezon from "../../assets/stores/quezon_location.png";
import Bmap from "../../assets/stores/google_map_batangas_city.png";
import Mmap from "../../assets/stores/google_map_makati.png";
import Qmap from "../../assets/stores/google_map_quezon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Storespage = () => {
    const [selectedStore, setSelectedStore] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const storeData = [
        {
            city: "Batangas City",
            address:
                "P. Burgos Street Barangay 10, Batangas City, 4200, Batangas",
            position: { latitude: 13.759106, longitude: 121.055285 },
            image: Batangas,
            map: Bmap,
        },
        {
            city: "Quezon",
            address: "Maharlika Highway, Barangay Tiaong, 4325, Quezon",
            position: { latitude: 13.945031, longitude: 121.360418 },
            image: Quezon,
            map: Qmap,
        },
        {
            city: "Makati",
            address:
                "Lower Ground Level, One Ayala, 1 Ayala Ave, Makati, Metro Manila",
            position: { latitude: 14.550253, longitude: 121.023775 },
            image: Manila,
            map: Mmap,
        },
    ];

    // Move to the next store in the carousel
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % storeData.length);
    };

    // Move to the previous store in the carousel
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? storeData.length - 1 : prevIndex - 1
        );
    };

    // Handle selecting a store
    const handleSelectStore = (store) => {
        setSelectedStore(store);
    };

    return (
        <main>
            <Navbar />

            <section className="menu-section">
                <div className="container mx-auto flex justify-center items-center px-1.5 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Column: Store Cards */}
                        <section className="carousel-section h-[80vh]">
                            <div className="container mx-auto flex justify-center items-center px-1.5 py-10 h-full">
                                <div className="carousel-container flex flex-col gap-5 items-center h-full w-full py-10">
                                    <h1 className="text-4xl font-bold text-center title mb-10">
                                        OUR STORES
                                    </h1>

                                    <div className="relative w-full max-w-full">
                                        {/* Carousel container */}
                                        <div className="relative w-full h-64 overflow-hidden rounded-lg">
                                            {/* Store image slider */}
                                            <div
                                                className="absolute inset-0 flex justify-center items-center transition-all duration-1000 ease-in-out"
                                                style={{
                                                    transform: `translateX(-${
                                                        currentIndex * 100
                                                    }%)`,
                                                }}
                                            >
                                                {storeData.map(
                                                    (store, index) => (
                                                        <div
                                                            key={index}
                                                            className="card w-full flex-none flex flex-col gap-4 items-center p-4 rounded-lg shadow-lg cursor-pointer"
                                                            onClick={() =>
                                                                handleSelectStore(
                                                                    store
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={
                                                                    store.image
                                                                }
                                                                alt={`Store in ${store.city}`}
                                                                className="w-full h-auto mb-4 rounded-md"
                                                            />
                                                            <h3 className="text-xl font-semibold">
                                                                {store.city}
                                                            </h3>
                                                            <p>
                                                                {store.address}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>

                                            {/* Navigation Arrows */}
                                            <button
                                                onClick={handlePrev}
                                                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 z-10"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faChevronLeft}
                                                />
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

                                        {/* Store name displayed in the center */}
                                        {storeData.length > 0 && (
                                            <div className="absolute inset-0 flex justify-center items-center">
                                                <h1 className="text-7xl text-white font-bold title transition-all duration-1000 ease-in-out">
                                                    {
                                                        storeData[currentIndex]
                                                            .city
                                                    }
                                                </h1>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Second Column: Map */}
                        <div className="map-container p-4">
                            {selectedStore ? (
                                <>
                                    <h3 className="text-2xl font-semibold mb-4">
                                        Map of {selectedStore.city}
                                    </h3>
                                    <img
                                        src={selectedStore.map}
                                        alt={`Map of ${selectedStore.city}`}
                                        className="w-full h-auto"
                                    />
                                </>
                            ) : (
                                <p className="text-center">
                                    Please select a store to view its map.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Storespage;
