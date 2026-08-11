import successimage from "../../../../images/success.svg";
import failimage from "../../../../images/fail.svg";

function InfoToolTip({ success, onClose }) {
  return (
    <div className="info-tool-tip" id="info-tool-tip">
      <img
        className="info-tool-tip__image"
        src={success ? successimage : failimage}
        alt="Avatar"
      />
      <p className="info-tool-tip__message">
        {success
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </p>
    </div>
  );
}

export default InfoToolTip;
