export const ReportItem = ({ title, value, money = false, desc = "" }) => {
  return (
    <>
      {" "}
      <div className="col-12 col-md-4 p-1">
        <div
          className={`alert ${
            value > 0 ? "alert-success text-white" : "alert-danger text-white"
          }`}
        >
          <div>
            <b>{title} :</b> {money ? "₹ " + Number(value).toFixed(2) : value}
          </div>
          <div className="xs-small">{desc}</div>
        </div>
      </div>
    </>
  );
};
