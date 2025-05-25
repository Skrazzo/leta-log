// ConfirmationModal.tsx
import React, { useEffect, useState, useRef, useCallback } from "react";

export type ModalVariant = "default" | "danger";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
    variant: ModalVariant;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    icon?: React.ReactNode;
    isConfirming?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    children,
    variant,
    title,
    confirmText = "Confirm",
    cancelText = "Cancel",
    icon,
    isConfirming = false,
}) => {
    // isMounted controls if the modal is in the DOM (for exit animation)
    const [isMounted, setIsMounted] = useState(isOpen);
    const [showContent, setShowContent] = useState(false);
    const modalPanelRef = useRef<HTMLDivElement>(null);

    // Effect for enter/leave animations and body scroll
    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            document.body.style.overflow = "hidden";
            // Delay to allow DOM element to be present before starting transition
            const openTimer = setTimeout(() => setShowContent(true), 10);
            return () => {
                clearTimeout(openTimer);
            };
        } else {
            setShowContent(false); // Start exit animation
            const closeTimer = setTimeout(() => {
                setIsMounted(false);
                document.body.style.overflow = "unset";
            }, 300); // Duration should match CSS transition
            return () => clearTimeout(closeTimer);
        }
    }, [isOpen]);

    // Effect for Escape key
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen && !isConfirming) {
                onClose();
            }
        },
        [isOpen, onClose, isConfirming]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click is directly on the overlay and not on the panel content
        if (event.target === event.currentTarget && !isConfirming) {
            onClose();
        }
    };

    // Variant specific styles
    let confirmButtonBaseClass =
        "w-full sm:w-auto px-4 py-2 text-sm font-medium text-background-light rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out";
    let confirmButtonVariantClass = "";
    let titleColorClass = "text-primary"; // Default title color
    let iconContainerColorClass = "text-accent"; // Default icon color

    switch (variant) {
        case "danger":
            confirmButtonVariantClass = "bg-danger hover:bg-danger/80 focus-visible:ring-danger";
            titleColorClass = "text-danger";
            iconContainerColorClass = "text-danger";
            break;
        default:
            confirmButtonVariantClass = "bg-accent hover:bg-accent/80 focus-visible:ring-accent";
            break;
    }

    const finalConfirmButtonClasses = `${confirmButtonBaseClass} ${confirmButtonVariantClass}`;
    const finalCancelButtonClasses =
        "w-full sm:w-auto px-4 py-2 text-sm font-medium text-secondary bg-transparent rounded-md border border-primary/15 shadow-sm hover:bg-background-dark/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 transition-colors duration-150 ease-in-out";

    if (!isMounted) {
        return null;
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby="modal-description"
            className={`fixed inset-0 z-[999] flex items-center justify-center p-4 transition-opacity duration-300 ease-out ${
                showContent ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={handleOverlayClick}
        >
            {/* Overlay background */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

            {/* Modal Panel */}
            <div
                ref={modalPanelRef}
                className={`relative w-full max-w-md transform overflow-hidden rounded-lg bg-background p-6 text-left align-middle shadow-xl transition-all duration-300 ease-out ${
                    showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
            >
                <div className="flex items-start space-x-3">
                    {icon && <div className={`flex-shrink-0 mt-0.5 ${iconContainerColorClass}`}>{icon}</div>}
                    <div className="flex-1">
                        {title && (
                            <h3 id="modal-title" className={`text-lg font-semibold leading-6 ${titleColorClass}`}>
                                {title}
                            </h3>
                        )}
                        <div id="modal-description" className="mt-2 text-sm text-gray-600">
                            {children}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ">
                    {cancelText && (
                        <button
                            type="button"
                            className={finalCancelButtonClasses}
                            onClick={onClose}
                            disabled={isConfirming}
                        >
                            {cancelText}
                        </button>
                    )}
                    <button
                        type="button"
                        className={finalConfirmButtonClasses}
                        onClick={onConfirm}
                        disabled={isConfirming}
                    >
                        {isConfirming ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
