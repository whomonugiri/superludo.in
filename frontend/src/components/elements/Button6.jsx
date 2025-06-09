import { useTranslation } from "react-i18next";

const Button6 = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <button
        onClick={() => {
          props.action(props.text);
        }}
        className={
          `${props.working && "disabled"} btn btn-sm ${
            props.type == props.text ? "btn-dark" : "btn-outline-dark"
          } ` + props.class
        }
      >
        {t(props.text)}
      </button>
    </>
  );
};

export default Button6;
