// in ts, i can use types in props...

export const Input = ({ label, id, type, name, props }) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        name={name}
        {...props}
      />
    </>
  );
};
