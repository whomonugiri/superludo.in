import { useTranslation } from "react-i18next";

const GST = ({ amount }) => {
  if (amount < 1) return;

  const { t } = useTranslation();
  const tax = amount * 0.28;
  const am = amount - tax;
  return (
    <>
      <div className="card shadow-sm rounded-3 bg-white mt-1 border">
        <div className="card-body p-0 py-2">
          <div className="d-flex align-items-center col-12 border-bottom">
            <div className="col-9 small px-3 py-2">
              <div>
                {t("GST_label_1")}{" "}
                <span className="badge bg-warning">{t("GST_A")}</span>
              </div>
              <div>{t("GST_label_2")}</div>
            </div>
            <div className="col-2  d-flex flex-column align-items-end">
              <div className="row">₹ {am.toFixed(2)}</div>
              <div className="row">₹ {tax.toFixed(2)}</div>
            </div>
          </div>

          <div className="d-flex align-items-center col-12">
            <div className="col-9 small px-3 py-2">
              <div>{t("GST_label_3")}</div>
              <div>
                {t("GST_label_4")}{" "}
                <span className="badge bg-warning">{t("GST_B")}</span>
              </div>
              <div className="fw-bold mt-2">
                {t("GST_label_5")}{" "}
                <span className="badge bg-warning">{t("GST_A")}</span> +{" "}
                <span className="badge bg-warning">{t("GST_B")}</span>
              </div>
            </div>
            <div className="col-2  d-flex flex-column align-items-end">
              <div className="row">₹ {amount.toFixed(2)}</div>
              <div className="row">₹ {tax.toFixed(2)}</div>
              <div className="row fw-bold text-success">
                ₹ {amount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GST;
