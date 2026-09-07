// NEW FEATURE: Shared fines data for consistency
export interface Fine {
  id: string;
  reference: string;
  violation: string;
  dateIssued: string;
  time: string;
  location: string;
  amount: number;
  status: "Unpaid" | "Paid" | "Disputed";
  speedRecorded?: number | null;
  speedLimit?: number | null;
  officerName: string;
  vehicle: string;
  description: string;
}

export const MOCK_FINES: Fine[] = [
  {
    id: "1",
    reference: "TF20260001",
    violation: "Speeding",
    dateIssued: "2026-07-15",
    time: "14:30",
    location: "Pretoria CBD, N1 Highway",
    amount: 500,
    status: "Unpaid",
    speedRecorded: 85,
    speedLimit: 60,
    officerName: "Officer M. Nkosi",
    vehicle: "BW 21 XB GP",
    description: "Exceeding speed limit by 25 km/h",
  },
  {
    id: "2",
    reference: "TF20260002",
    violation: "Reckless Driving",
    dateIssued: "2026-07-10",
    time: "08:15",
    location: "Centurion, Old Johannesburg Road",
    amount: 750,
    status: "Unpaid",
    speedRecorded: null,
    speedLimit: null,
    officerName: "Officer J. Van der Merwe",
    vehicle: "BW 21 XB GP",
    description: "Failure to maintain lane discipline",
  },
  {
    id: "3",
    reference: "TF20260003",
    violation: "Parking Violation",
    dateIssued: "2026-06-28",
    time: "11:45",
    location: "Sandton City Mall",
    amount: 250,
    status: "Paid",
    speedRecorded: null,
    speedLimit: null,
    officerName: "Officer T. Dlamini",
    vehicle: "BW 21 XB GP",
    description: "Parking in a no-parking zone",
  },
];

// NEW FEATURE: Helper functions for fines
export const getFineSummary = (fines: Fine[]) => {
  const unpaid = fines.filter(f => f.status === "Unpaid");
  const totalUnpaid = unpaid.reduce((sum, f) => sum + f.amount, 0);
  return {
    outstandingBalance: totalUnpaid,
    unpaidCount: unpaid.length,
    totalFines: fines.length,
  };
};

export const STATUS_COLORS = {
  Unpaid: "#F44336",
  Paid: "#4CAF50",
  Disputed: "#FF9800",
};

export const STATUS_ICONS = {
  Unpaid: "alert-circle",
  Paid: "checkmark-circle",
  Disputed: "help-circle",
};