import "../CSS/LeaveTable.css";

const leaves = [
  { type: "Sick", from: "21/07/2025", to: "28/07/2025", status: "Pending" },
  {
    type: "Academic",
    from: "01/04/2025",
    to: "04/04/2025",
    status: "Approved",
  },
  {
    type: "Personal",
    from: "12/07/2025",
    to: "13/07/2025",
    status: "Rejected",
  },
  { type: "Sick", from: "21/07/2025", to: "28/07/2025", status: "Pending" },
  {
    type: "Personal",
    from: "12/07/2025",
    to: "13/07/2025",
    status: "Rejected",
  },
  {
    type: "Academic",
    from: "01/04/2025",
    to: "04/04/2025",
    status: "Approved",
  },
  { type: "Sick", from: "22/05/2025", to: "24/05/2025", status: "Approved" },
];

export default function LeaveTable() {
  return (
    <div className="leave-table">
      <div className="leave-table-header">
        <h3>Recent Leave Requests</h3>
        <a href="/leavehistory/approvedleave">View all &gt;</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, idx) => (
            <tr key={idx}>
              <td>{leave.type}</td>
              <td>{leave.from}</td>
              <td>{leave.to}</td>
              <td>
                <span className={`status ${leave.status.toLowerCase()}`}>
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
