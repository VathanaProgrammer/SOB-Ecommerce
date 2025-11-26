"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/layouts/Header";
import api from "@/api/api";

interface RewardItem {
  date: string;
  invoice_no: string;
  earned: number;
  redeemed: number;
  note: string;
}

const Reward: React.FC = () => {
  const [history, setHistory] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch reward history from backend API
    api
      .get("/api/rewards/history") // replace with your endpoint
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => {
        console.error("Error fetching reward history:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-full gap-6">
      <Header title="Your Reward" />

      <h2 className="text-2xl font-semibold text-gray-800">Your Rewards Histories</h2>
      <p className="text-gray-500 mb-4">
        Here is the detailed history of your earned and redeemed rewards.
      </p>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-500">No reward history found.</p>
        ) : (
          <table className="table-auto w-full border border-gray-300 rounded-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Invoice No</th>
                <th className="px-4 py-2 text-right">Earned</th>
                <th className="px-4 py-2 text-right">Redeemed</th>
                <th className="px-4 py-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 text-gray-800">
              {history.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="px-4 py-2">{new Date(item.date).toLocaleString()}</td>
                  <td className="px-4 py-2">{item.invoice_no}</td>
                  <td className="px-4 py-2 text-right">
                    {item.earned.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {item.redeemed.toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{item.note || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reward;
