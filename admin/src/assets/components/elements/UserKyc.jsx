export const UserKyc = ({ user }) => {
  return (
    <>
      <div className=" rounded shadow-sm bg-white mx-2 ">
        {!user.kyc && (
          <div className="text-center py-3 ">KYC Not Submitted</div>
        )}
        {user.kyc && (
          <div className="p-3 d-flex flex-wrap justify-content-between">
            <div className="col-12 col-md-6 p-2">
              <div className=" alert-danger small text-white d-flex  gap-2 p-2 border border-2 rounded">
                <img
                  src={`data:image/jpeg;base64,${user.kycData.photo}`}
                  className="rounded border"
                  height="100px"
                />
                <div className="">
                  <div className="fw-bold">
                    Aadhar No : {user.kycData.aadhar_no}
                  </div>
                  <div className="">Name : {user.kycData.name}</div>
                  <div className="">DOB : {user.kycData.date_of_birth}</div>
                  <div className="">
                    Gender : {user.kycData.gender == "M" ? "Male" : "Female"}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 p-2">
              <div className=" p-2 border border-2 rounded alert-danger text-white small h-100">
                <div className="fw-bold">Address</div>
                {user.kycData.care_of} {user.kycData.full_address}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
