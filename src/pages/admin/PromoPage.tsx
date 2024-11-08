import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../components/DataTable";
import AddPromoModal from "../../components/AddPromoModal"; // Import AddPromoModal
import UpdatePromoModal from "../../components/UpdatePromoModal"; // Import UpdatePromoModal

interface PromoBanner {
    promo_id: number;
    image: string;
    active: boolean;
    title: string;
    description: string;
}

const columnHelper = createColumnHelper<PromoBanner>();

const PromoPage = () => {
    const [promoBanners, setPromoBanners] = useState<PromoBanner[]>([]);
    const [showAddPromoModal, setShowAddPromoModal] = useState(false); // State to control the modal
    const [showUpdatePromoModal, setShowUpdatePromoModal] = useState(false); // State for update modal
    const [selectedPromo, setSelectedPromo] = useState<PromoBanner | null>(
        null
    ); // State to hold the promo to be updated
    const [reload, setReload] = useState(false); // State to trigger reload after adding or updating promo

    // Fetch promo banners from an API or use hardcoded data
    useEffect(() => {
        const fetchPromoBanners = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/get-promos"
                ); // Replace with actual API endpoint
                if (!response.ok) {
                    throw new Error("Failed to fetch promo banners");
                }
                const data: PromoBanner[] = await response.json();
                console.log(data);
                setPromoBanners(data);
            } catch (error) {
                console.error("Error fetching promo banners:", error);
            }
        };

        fetchPromoBanners();
    }, [reload]); // Reload promo banners when a new promo is added or updated
    const localRole = localStorage.getItem("role");

    const columns = [
        columnHelper.accessor("promo_id", {
            header: () => <span>ID</span>,
            cell: (info) => <p>{info.getValue()}</p>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("promo_image", {
            header: () => <span>Image</span>,
            cell: (info: any) => (
                <img
                    src={info
                        .getValue()
                        .replace(/^..\\frontend\\src\\/, ".\\src\\")}
                    alt="Promo Banner"
                    className="w-[20rem] object-cover"
                />
            ),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("promo_title", {
            header: () => <span>Title</span>,
            cell: (info: any) => <p>{info.getValue()}</p>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("promo_description", {
            header: () => <span>Description</span>,
            cell: (info: any) => <p>{info.getValue()}</p>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor("active", {
            header: () => <span>Active</span>,
            cell: (info) => {
                const isActive = info.getValue();
                return (
                    <div
                        className={`p-2 text-white rounded text-center ${
                            isActive ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                        {isActive ? "Yes" : "No"}
                    </div>
                );
            },
            footer: (info) => info.column.id,
        }),
        // columnHelper.accessor("actions", {
        //     header: () => <span>Actions</span>,
        //     cell: (info) => {
        //         const promo = info.row.original;
        //         return (
        //             <div className="flex space-x-2">
        //                 {/* Update Button */}
        //                 <button
        //                     className="btn btn-sm btn-primary"
        //                     onClick={() => handleUpdatePromo(promo)}
        //                 >
        //                     Update
        //                 </button>

        //                 {/* Delete Button */}
        //                 <button
        //                     className="btn btn-sm btn-danger"
        //                     onClick={() => handleDeletePromo(promo.id)}
        //                 >
        //                     Delete
        //                 </button>
        //             </div>
        //         );
        //     },
        //     footer: (info) => info.column.id,
        // }),
    ];

    // Handle modal visibility and reload state
    const handleAddPromo = () => {
        setShowAddPromoModal(true);
    };

    const handleUpdatePromo = (promo: PromoBanner) => {
        setSelectedPromo(promo);
        setShowUpdatePromoModal(true); // Show update modal when update button is clicked
    };

    const handleDeletePromo = (id: number) => {
        // Confirmation prompt for deletion
        if (window.confirm("Are you sure you want to delete this promo?")) {
            // Logic for deletion goes here, for now, we'll simulate it by filtering out the promo
            setPromoBanners(
                promoBanners.filter((promo) => promo.promo_id !== id)
            );
            setReload(!reload); // Trigger reload
        }
    };

    return (
        <section className="manager h-screen flex">
            <Sidebar />
            <main className="main__container h-full w-4/5 p-5 overflow-auto">
                <div className="main__header flex justify-between items-center">
                    <h1 className="main__title text-3xl uppercase">
                        Promo Banners
                    </h1>
                    {localRole !== "owner" && (
                        <button
                            className="bg-amber-600 px-2.5 py-3 text-base text-white hover:bg-amber-700 transition"
                            onClick={handleAddPromo} // Trigger modal on button click
                        >
                            Add Promotion
                        </button>
                    )}
                </div>

                <hr className="border border-amber-600 my-3" />

                <div className="main__table__container">
                    <DataTable data={promoBanners} columns={columns} />
                </div>
            </main>

            {/* AddPromoModal */}
            <AddPromoModal
                showAddPromoModal={showAddPromoModal}
                setShowAddPromoModal={setShowAddPromoModal}
                setReload={setReload} // Pass reload state to trigger re-fetch
            />

            {/* UpdatePromoModal */}
            {selectedPromo && (
                <UpdatePromoModal
                    showUpdatePromoModal={showUpdatePromoModal}
                    setShowUpdatePromoModal={setShowUpdatePromoModal}
                    promoData={selectedPromo}
                    updatePromo={(updatedPromo) => {
                        // Update promo in the list
                        setPromoBanners((prev: any) =>
                            prev.map((promo: any) =>
                                promo.promo_id === updatedPromo.id
                                    ? updatedPromo
                                    : promo
                            )
                        );
                        setReload(!reload); // Trigger reload
                    }}
                />
            )}
        </section>
    );
};

export default PromoPage;
