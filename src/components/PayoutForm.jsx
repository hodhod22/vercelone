import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPayout } from "../features/payoutSlice";

const PayoutForm = () => {
  const userId = localStorage.getItem("userId");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { paymentUrl, loading, error } = useSelector((state) => state.payout);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      requestPayout({
        amount,
        description,
        callback_url: "https://poolbeferest.com/verify-payout",
        mobile: "1234567890",
        email: "user@example.com",
        userId, // Replace with actual user ID
      })
    );
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Processing..." : "Request Payout"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {paymentUrl && (
        <a href={paymentUrl} className="text-blue-500 underline">
          Proceed to Payment
        </a>
      )}
    </div>
  );
};

export default PayoutForm;
