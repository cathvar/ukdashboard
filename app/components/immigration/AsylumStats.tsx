"use client";

export default function AsylumStats() {
  return (
    <div className="space-y-8">
      <div className="dashboard-card">
        <h3 className="text-xl font-bold mb-4">Asylum and Protection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Applications by Nationality</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Afghanistan</span>
                <span className="font-semibold">9,964</span>
              </li>
              <li className="flex justify-between">
                <span>Iran</span>
                <span className="font-semibold">7,805</span>
              </li>
              <li className="flex justify-between">
                <span>Syria</span>
                <span className="font-semibold">7,392</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Decision Outcomes</h4>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Granted</span>
                <span className="font-semibold">67%</span>
              </li>
              <li className="flex justify-between">
                <span>Refused</span>
                <span className="font-semibold">23%</span>
              </li>
              <li className="flex justify-between">
                <span>Withdrawn</span>
                <span className="font-semibold">10%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 