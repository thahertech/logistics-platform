import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useBuyShipment = (kuljetus, isOwner) => {
  const router = useRouter();

  const onBuyShipment = async () => {
    // If the user is the owner of the shipment, prevent them from buying it
    if (isOwner) {
      toast.error("Et voi ostaa omaa kuljetustasi!");
      return;
    }

    try {
      // Retrieve the cart from localStorage or initialize an empty array if not found
      let savedCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Add the current shipment to the cart
      savedCart.push(kuljetus);

      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(savedCart));

      // Notify the user that the shipment has been added to the cart
      toast.success("Kuljetus lisätty ostoskoriin!");

      // Redirect to the checkout page
      router.push("/maksu/checkout");
    } catch (err) {
      // If there's an error, log it and notify the user
      console.error(err);
      toast.error("Jotain meni pieleen. Yritä uudelleen.");
    }
  };

  return { onBuyShipment };
};

export default useBuyShipment;