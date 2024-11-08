import { useState, useEffect } from "react";

interface UpdatePromoModalProps {
    showUpdatePromoModal: boolean;
    setShowUpdatePromoModal: (show: boolean) => void;
    promoData: {
        promo_id: number;
        title: string;
        description: string;
        image: string;
        active: boolean;
    };
    updatePromo: (updatedPromo: {
        id: number;
        title: string;
        description: string;
        image: string;
        active: boolean;
    }) => void;
}

const UpdatePromoModal = ({
    showUpdatePromoModal,
    setShowUpdatePromoModal,
    promoData,
    updatePromo,
}: UpdatePromoModalProps) => {
    const [promoTitle, setPromoTitle] = useState(promoData.title);
    const [promoDescription, setPromoDescription] = useState(
        promoData.description
    );
    const [promoImage, setPromoImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        promoData.image
    );
    const [isActive, setIsActive] = useState(promoData.active);

    // Reset form when modal is closed or promoData changes
    useEffect(() => {
        setPromoTitle(promoData.title);
        setPromoDescription(promoData.description);
        setImagePreview(promoData.image);
        setIsActive(promoData.active);
    }, [promoData, showUpdatePromoModal]);

    // Function to reset form fields
    const resetForm = () => {
        setPromoTitle("");
        setPromoDescription("");
        setPromoImage(null);
        setImagePreview(null);
        setIsActive(true); // Reset to default active state
    };

    // Close modal and reset form when it's closed
    useEffect(() => {
        const modal = document.getElementById(
            "update_promo_modal"
        ) as HTMLDialogElement;
        if (modal) {
            if (showUpdatePromoModal) {
                modal.showModal();
            } else {
                resetForm(); // Reset fields before closing
                modal.close();
            }
        }
    }, [showUpdatePromoModal]);

    // Handle image file input change
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPromoImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    // Handle submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate title and description
        if (!promoTitle.trim() || !promoDescription.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedPromo = {
            id: promoData.id,
            title: promoTitle,
            description: promoDescription,
            image: promoImage
                ? URL.createObjectURL(promoImage)
                : promoData.image, // Use new image or fallback
            active: isActive, // Include active status
        };

        updatePromo(updatedPromo); // Pass updated data to parent component
        setShowUpdatePromoModal(false); // Close the modal after update
    };

    // Handle active checkbox change
    const handleActiveChange = () => {
        setIsActive((prev) => !prev);
    };

    // Clean up image preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (imagePreview && promoImage) {
                URL.revokeObjectURL(imagePreview); // Clean up URL object
            }
        };
    }, [imagePreview, promoImage]);

    return (
        <dialog id="update_promo_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => setShowUpdatePromoModal(false)}
                    >
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Update Promotion</h3>
                <form className="py-4 flex flex-col" onSubmit={handleSubmit}>
                    {/* Promotion Title */}
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Promotion Title</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Promotion Title"
                            className="input input-bordered w-full rounded-md"
                            value={promoTitle}
                            onChange={(e) => setPromoTitle(e.target.value)}
                        />
                    </label>

                    {/* Promotion Description */}
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">
                                Promotion Description
                            </span>
                        </div>
                        <textarea
                            placeholder="Description"
                            className="input input-bordered w-full rounded-md"
                            value={promoDescription}
                            onChange={(e) =>
                                setPromoDescription(e.target.value)
                            }
                        />
                    </label>

                    {/* Image Upload */}
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Upload Image</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="input input-bordered w-full rounded-md"
                            onChange={handleImageChange}
                        />
                    </label>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="mt-4 flex justify-center">
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="w-48 h-48 object-cover rounded-md border"
                            />
                        </div>
                    )}

                    {/* Active Status */}
                    <label className="flex items-center mt-4">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={handleActiveChange}
                            className="checkbox"
                        />
                        <span className="ml-2">Active</span>
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-amber-600 px-4 py-2 text-base text-white hover:bg-amber-700 transition mt-4"
                    >
                        Update Promotion
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default UpdatePromoModal;
