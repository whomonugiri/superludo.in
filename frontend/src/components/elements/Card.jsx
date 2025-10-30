export const Card = (props) => {
  return (
    <>
      <div className={` p-3 rounded my-3  ${props.class}`}>
        {props.children}
      </div>
    </>
  );
};
