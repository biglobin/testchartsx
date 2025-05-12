const Card = ({ title, value, icon }) => (
  <div className="card">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{title}</p>
          <h2 className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{value}</h2>
        </div>
        {icon && <div className="text-2xl" style={{ color: 'var(--primary-color)' }}>{icon}</div>}
      </div>
    </div>
  </div>
);

export default Card;
