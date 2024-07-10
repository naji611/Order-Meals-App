export default function Input({ label, id, className, ...prop }) {
  let cssClasses = className === "control-row" ? " control-row " : "";
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...prop} name={id} required />
    </p>
  );
}
