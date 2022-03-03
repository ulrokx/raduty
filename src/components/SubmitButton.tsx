export const SubmitButton: React.FC = ({ children }) => (
  <button
    type="submit"
    className="mt-4 hover:scale-105 transition-all border-2 rounded-md bg-red-500 text-2xl text-white p-3">
    {children}
  </button>
);
