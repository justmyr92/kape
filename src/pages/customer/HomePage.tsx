import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import coffeeBeerCup from "../../assets/customer/coffee-beer-cup.png";
import cofferBeerCupPreview from "../../assets/customer/coffee_beer_cafe_preview.mp4";
import frappe from "../../assets/customer/frappe_img.png";
import pizza from "../../assets/customer/pizza_img.png";
import chicken from "../../assets/customer/chicken_img.png";

const HomePage = () => {
    return (
        <main>
            <Navbar />
            <section className="hero__section h-screen">
                <div className="container mx-auto flex justify-between px-1.5 py-4 h-full">
                    <div className="hero__main__content h-full w-[55%] flex flex-col gap-8 justify-center">
                        <div className="subtitle__container">
                            <h1 className="text-5xl">
                                Start your day with coffee.
                            </h1>
                            <h1 className="text-5xl">
                                End your day with bear.
                            </h1>
                        </div>
                        <div className="button__container">
                            <Link
                                to={"/menu"}
                                className="cta__btn rounded-sm border border-amber-700 bg-amber-700 text-white text-lg px-3 py-2.5 uppercase"
                            >
                                Discover Menu
                            </Link>
                        </div>
                    </div>
                    <div className="hero__image__content h-full w-[45%] flex items-center justify-center">
                        <img
                            src={coffeeBeerCup}
                            alt="coffee-beer-cup.png"
                            className="h-full"
                        />
                    </div>
                </div>
            </section>
            <section className="video__section h-[90vh] bg-gray-950">
                <div className="container mx-auto flex h-full justify-between px-1.5">
                    <div className="video__main__content flex w-full h-full gap-8 justify-center">
                        <video controls className="h-full">
                            <source
                                src={cofferBeerCupPreview}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            </section>
            <section className="drinks__demo__section h-[80vh]">
                <div className="container mx-auto flex h-full justify-between px-1.5 py-8 gap-10">
                    <div className="drinks__image__content h-full w-1/2">
                        <img
                            src={frappe}
                            alt="frappe.png"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="drinks__main__content h-full w-1/2 flex flex-col gap-8 justify-center">
                        <div className="subtitle__container">
                            <h1 className="text-5xl">
                                Take a sip and let the frappe do the talking.
                            </h1>
                        </div>
                        <div className="button__container">
                            <Link
                                to={"/menu"}
                                className="cta__btn rounded-sm border border-amber-700 bg-amber-700 text-white text-lg px-3 py-2.5 uppercase"
                            >
                                Sip and Go
                            </Link>
                        </div>
                    </div>
                </div>
            </section>{" "}
            <section className="explore__demo__section">
                <div className="container mx-auto flex h-full justify-between px-1.5 py-8 gap-10">
                    <div className="flex flex-col justify-start w-1/2 gap-5">
                        <div className="explore__image__content">
                            <img
                                src={pizza}
                                alt="pizza.png"
                                className="w-[90%]"
                            />
                        </div>

                        <div className="subtitle__container">
                            <h1 className="text-5xl">
                                Savoring every moment and every bite.
                            </h1>
                        </div>
                        <div className="button__container">
                            <Link
                                to={"/menu"}
                                className="cta__btn rounded-sm border border-amber-700 bg-amber-700 text-white text-lg px-3 py-2.5 uppercase"
                            >
                                Explore
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start w-1/2 gap-5">
                        <div className="explore__image__content">
                            <img
                                src={chicken}
                                alt="chicken.png"
                                className="w-[90%]"
                            />
                        </div>

                        <div className="subtitle__container">
                            <h1 className="text-5xl">
                                Winging my way to happinnes, one bite at a time
                            </h1>
                        </div>
                        <div className="button__container">
                            <Link
                                to={"/menu"}
                                className="cta__btn rounded-sm border border-amber-700 bg-amber-700 text-white text-lg px-3 py-2.5 uppercase"
                            >
                                Explore
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
