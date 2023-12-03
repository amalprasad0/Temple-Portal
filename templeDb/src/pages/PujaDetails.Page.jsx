import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "../components/NavBar";

export function PujaDetailsPage() {
  const [pujaDetails, setPujaDetails] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [pujasThisMonth, setPujasThisMonth] = useState(0);
  const [pujasThisYear, setPujasThisYear] = useState(0);
  const [pujasToday, setPujasToday] = useState(0);
  const [highestPujasMonth, setHighestPujasMonth] = useState({
    month: "",
    count: 0,
    totalAmount: 0,
  });
  const [highestPujasYear, setHighestPujasYear] = useState({
    year: "",
    count: 0,
    totalAmount: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    // Fetch puja details from the provided link
    axios
      .get("https://templedb-production.onrender.com/getalldetails")
      .then((response) => {
        const details = response.data.allDetails;
        setPujaDetails(details);

        // Calculate Monthly, Yearly, and Today's totals
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const currentDay = currentDate.toISOString().split("T")[0];

        const monthlyTotal = details.reduce((acc, puja) => {
          const pujaDate = new Date(puja.pujaDate);
          const pujaMonth = pujaDate.getMonth() + 1;
          const pujaYear = pujaDate.getFullYear();

          if (pujaMonth === currentMonth && pujaYear === currentYear) {
            acc += parseInt(puja.price);
          }

          return acc;
        }, 0);

        const yearlyTotal = details.reduce((acc, puja) => {
          const pujaYear = new Date(puja.pujaDate).getFullYear();

          if (pujaYear === currentYear) {
            acc += parseInt(puja.price);
          }

          return acc;
        }, 0);

        const pujasThisMonth = details.filter((puja) => {
          const pujaMonth = new Date(puja.pujaDate).getMonth() + 1;
          const pujaYear = new Date(puja.pujaDate).getFullYear();
          return pujaMonth === currentMonth && pujaYear === currentYear;
        }).length;

        const pujasThisYear = details.filter((puja) => {
          const pujaYear = new Date(puja.pujaDate).getFullYear();
          return pujaYear === currentYear;
        }).length;

        const pujasToday = details.filter(
          (puja) => puja.pujaDate === currentDay
        ).length;

        setMonthlyTotal(monthlyTotal);
        setYearlyTotal(yearlyTotal);
        setPujasThisMonth(pujasThisMonth);
        setPujasThisYear(pujasThisYear);
        setPujasToday(pujasToday);

        // Find the month with the highest number of pujas
        const monthlyCounts = details.reduce((acc, puja) => {
          const pujaMonth = new Date(puja.pujaDate).getMonth() + 1;
          if (!acc[pujaMonth]) {
            acc[pujaMonth] = { count: 0, totalAmount: 0 };
          }
          acc[pujaMonth].count += 1;
          acc[pujaMonth].totalAmount += parseInt(puja.price);
          return acc;
        }, {});

        const highestMonth = Object.entries(monthlyCounts).reduce(
          (max, [month, data]) => {
            if (data.count > max.count) {
              return { month, ...data };
            }
            return max;
          },
          { count: 0, totalAmount: 0 }
        );

        setHighestPujasMonth(highestMonth);

        // Find the year with the highest number of pujas
        const yearlyCounts = details.reduce((acc, puja) => {
          const pujaYear = new Date(puja.pujaDate).getFullYear();
          if (!acc[pujaYear]) {
            acc[pujaYear] = { count: 0, totalAmount: 0 };
          }
          acc[pujaYear].count += 1;
          acc[pujaYear].totalAmount += parseInt(puja.price);
          return acc;
        }, {});

        const highestYear = Object.entries(yearlyCounts).reduce(
          (max, [year, data]) => {
            if (data.count > max.count) {
              return { year, ...data };
            }
            return max;
          },
          { count: 0, totalAmount: 0 }
        );

        setHighestPujasYear(highestYear);
      })
      .catch((error) => {
        console.error("Error fetching puja details:", error);
      });
  }, []);

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    // Add logic to update totals for the selected month
    const selectedMonthTotal = pujaDetails.reduce((acc, puja) => {
      const pujaDate = new Date(puja.pujaDate);
      const pujaMonth = pujaDate.getMonth() + 1;
      const pujaYear = pujaDate.getFullYear();

      if (
        pujaMonth === parseInt(selectedMonth) &&
        pujaYear === new Date().getFullYear()
      ) {
        acc += parseInt(puja.price);
      }

      return acc;
    }, 0);

    setMonthlyTotal(selectedMonthTotal);
    // You can add similar logic to update other totals if needed
  };

  return (
    <>
      <NavBar />
      <div className="py-3" style={{ backgroundColor: "#454d5d" }}>
        <div className="container mt-4" style={{ color: "#ffffff" }}>
          <div className="row">
            <div className="col-md-3 my-3">
              <div className="card" style={{}}>
                <div className="card-body">
                  <h5 className="card-title">പ്രതിമാസ ആകെ പൂജ തുക</h5>
                  <p className="card-text fs-1 fw-bold">{monthlyTotal} INR</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 my-3">
              <div className="card" style={{}}>
                <div className="card-body">
                  <h5 className="card-title">വാർഷിക ആകെ പൂജ തുക</h5>
                  <p className="card-text fs-1 fw-bold">{yearlyTotal} INR</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 my-3">
              <div className="card" style={{}}>
                <div className="card-body">
                  <h5 className="card-title">ഈ മാസത്തെ പൂജകൾ</h5>
                  <p className="card-text fs-1 fw-bold">{pujasThisMonth}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 my-3">
              <div className="card" style={{}}>
                <div className="card-body">
                  <h5 className="card-title">ഈ വർഷത്തെ പൂജകൾ</h5>
                  <p className="card-text fs-1 fw-bold">{pujasThisYear}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 my-3">
            <div className="col-md-3">
              <div className="card" style={{}}>
                <div className="card-body">
                  <h5 className="card-title">ഇന്നത്തെ പൂജകൾ</h5>
                  <p className="card-text fs-1 fw-bold">{pujasToday}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 my-3">
            <div className="col-md-6">
              <div className="card" style={{}}>
                <div className="card-body">
                  <h5 className="card-title">ഈ മാസത്തെ ഏറ്റവും ഉയർന്ന പൂജകൾ</h5>
                  <div className="mb-3">
                    <label htmlFor="selectMonth" className="form-label">
                      Select Month
                    </label>
                    <select
                      className="form-select border-5 border-dark"
                      id="selectMonth"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      <option value="">Select a Month</option>
                      <option value="">Select a Month</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                  </div>
                  <p className="card-text">മാസം: {highestPujasMonth.month}</p>
                  <p className="card-text">
                    നമ്പറുകൾ: {highestPujasMonth.count}
                  </p>
                  <p className="card-text">
                    മൊത്തം തുക: {highestPujasMonth.totalAmount} INR
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 my-3">
              <div className="card" style={{}}>
                <div className="card-body">
                  <h5 className="card-title">ഈ വർഷത്തെ ഏറ്റവും ഉയർന്ന പൂജകൾ</h5>
                  <p className="card-text">മാസം: {highestPujasYear.year}</p>
                  <p className="card-text">
                    നമ്പറുകൾ: {highestPujasYear.count}
                  </p>
                  <p className="card-text">
                    മൊത്തം തുക: {highestPujasYear.totalAmount} INR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
