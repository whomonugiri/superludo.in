export const Card = (props) => {
  return (
    <>
      <div
        className={`border p-3 rounded shadow-sm my-3 bg-primary-light ${props.class}`}
      >
        {props.children}
      </div>
    </>
  );
};
