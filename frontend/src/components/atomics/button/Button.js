import "./Button.css";

// in ts, i can use types in props...

export const Button = ({ variant, onClick, buttonText, type }) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`button button--${variant}`}
      >
        {buttonText}
      </button>
    </>
  );
};
