import React from "react";
import { Button } from "reactstrap";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  top: "50%",
  left: "50%",
  zIndex: 1000,
  width: "800px",
  padding: "50px",
  position: "fixed",
  backgroundColor: "#FFF",
  transform: "translate(-50%, -50%)",
};

const OVERLAY_STYLES = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  position: "fixed",
  zIndex: 1000,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
};

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <Button color="danger" onClick={onClose} size="sm" className="mb-4">
          X Cancel
        </Button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
}
