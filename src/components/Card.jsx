const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-xl font-bold">{value}</h2>
  </div>
);

export default Card;
