export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  as,
  ...props
}) {
  return (
    <label className="input-group">
      <span>{label}</span>
      {as === "textarea" ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} {...props} />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      )}
    </label>
  );
}
