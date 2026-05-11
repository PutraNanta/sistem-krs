export default function SelectInput({ label, value, onChange, options, ...props }) {
  return (
    <label className="input-group">
      <span>{label}</span>
      <select value={value} onChange={onChange} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
