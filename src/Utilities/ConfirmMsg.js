import Swal from "sweetalert2";

export default function ConfirmMsg(msg) {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: `Your Note has been ${msg}`,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function alertMsg() {
  return Swal.fire({
    position: "center",
    icon: "warning",
    title: `Title and Content are required`,
    showConfirmButton: false,
    timer: 1500,
  });
}
