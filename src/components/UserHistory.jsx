import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithdrawalHistory } from "../features/userSlice";

const UserHistory = ({ userId }) => {
  const dispatch = useDispatch();
  const { withdrawalHistory, loading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchWithdrawalHistory(userId));
  }, [dispatch, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Withdrawal History</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {withdrawalHistory.map((withdrawal) => (
            <tr key={withdrawal._id} className="border-b">
              <td className="p-2">{withdrawal.amount}</td>
              <td className="p-2">{withdrawal.status}</td>
              <td className="p-2">
                {new Date(withdrawal.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistory;
