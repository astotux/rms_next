export default function ProjectFeature({ icon, alt, name, value, prop }) {
    return (
      <li>
        <div className="card-icon-cont">
          <img alt={alt} src={icon} />
        </div>
        <div>
          <p className="card-parametrs-name">{name}</p>
          <p className="card-parametrs" content={value} itemProp={prop}>
            {value}
          </p>
        </div>
      </li>
    );
  }