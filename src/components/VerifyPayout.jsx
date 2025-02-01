import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { verifyPayout } from "../features/payoutSlice";

const VerifyPayout = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { verificationStatus, loading, error } = useSelector(
    (state) => state.payout
  );

  useEffect(() => {
    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    if (authority && status) {
      dispatch(verifyPayout({ authority, status }));
    }
  }, [dispatch, searchParams]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Verifying Payment...</h2>
      {loading && <p>Please wait while we verify your payment.</p>}
      {verificationStatus && (
        <p className="text-green-500">{verificationStatus}</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default VerifyPayout;
