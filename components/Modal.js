import { createPortal } from "react-dom";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosClose } from "react-icons/io";

import classes from "./Modal.module.css";

export const Overlay = ({
  className,
  children,
  asBackground,
  roundedBy,
  onExit,
}) => {
  const overlayClasses = `${classes.overlay} ${className ? className : ""} ${
    asBackground ? classes.asBackground : ""
  }`;

  return (
    <div className={overlayClasses} onClick={onExit}>
      {children}
      <style jsx>{`
        div {
          ${roundedBy ? `border-radius: ${roundedBy}` : ""}
        }
      `}</style>
    </div>
  );
};

const ModalBox = ({ children, width }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className={classes.container}>
      {children}
      <style jsx>{`
        div {
          ${width ? `max-width: ${width}` : ""};
        }
      `}</style>
    </div>
  );
};

const Modal = (props) => {
  const router = useRouter();
  const { redirect } = router.query;
  const href = redirect ? redirect : router.pathname;

  const exitModal = () => {
    router.push(href, null, { shallow: true });
  };

  return (
    <>
      {createPortal(
        <Overlay className={classes.modalOverlay} onExit={exitModal} />,
        document.getElementById("overlays")
      )}
      {createPortal(
        <div className={classes.close}>
          <Link href={href} className={classes.closeBtn} shallow={true}>
            <IoIosClose size={45} color="white" />
          </Link>
        </div>,
        document.getElementById("overlays")
      )}
      {createPortal(
        <ModalBox {...props} />,
        document.getElementById("overlays")
      )}
    </>
  );
};

export default Modal;
