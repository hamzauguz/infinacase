import Swal from "sweetalert2";

export const totalProductPrice = (items) => {
  return items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
};

export const totalQuantity = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const showConfirmationDialog = (title, text, icon, onConfirmed) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    iconColor: "#84c7c4",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirmed();
    }
  });
};
