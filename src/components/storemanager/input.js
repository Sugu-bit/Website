const Input = ({ label, name, value, onChange, error }) => (
    <div>
        <label className="block text-sm font-medium">{label}</label>
        <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default Input;
  