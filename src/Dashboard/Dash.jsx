import React from "react";
import "../CSS/Dash.css"
import Dashsidebar from "./Dashsidebar";
import {
    FaBell,
    FaDollarSign,
     FaLightbulb ,
    FaShoppingBasket,
    FaUsers
} from "react-icons/fa";
import Chart from "react-apexcharts";

export default function Dashboard() {

    const revenue = {

        series: [
            {
                name: "Total Income",
                data: [30, 40, 28, 50, 42, 67, 100]
            },
            {
                name: "Total Expense",
                data: [78, 32, 45, 79, 34, 44, 38]
            }
        ],

        options: {

            chart: {
                toolbar: { show: false },
                zoom: { enabled: false }
            },

            stroke: {
                curve: "smooth",
                width: 3
            },

            colors: ["#16a34a", "#f4b400"],

            dataLabels: {
                enabled: false
            },

            grid: {
                borderColor: "#eee"
            },

            legend: {
                position: "top"
            },

            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
            }

        }

    };

    const sales = {

        series: [86, 11, 2, 1],

        options: {

            chart: {
                type: "donut"
            },

            labels: [
                "Income",
                "Refund",
                "Shipping",
                "Order"
            ],

            colors: [
                "#0aad0a",
                "#fbbc04",
                "#ef4444",
                "#2563eb"
            ],

            legend: {
                position: "bottom"
            },

            dataLabels: {
                enabled: false
            }

        }

    };


    return (

        <>

            <div className="dashboard-layout">

                <Dashsidebar />

                <div className="dashboard-content">
                    {/* Topbar */}

                    <div className="dashboard-topbar">

                        <input
                            type="text"
                            placeholder="Search"
                            className="dashboard-search"
                        />

                        <div className="dashboard-profile">

                            <div className="notification">

                                <FaBell />

                                <span>2</span>

                            </div>

                            <img
                                src="https://i.pravatar.cc/50"
                                alt=""
                            />

                        </div>

                    </div>

                    {/* Banner */}

                    <div className="dashboard-banner">

                        <div className="banner-content">

                            <h1>Welcome back! FreshCart</h1>

                            <p>
                                FreshCart is simple & clean design for developer and designer.
                            </p>

                            <button>Create Product</button>

                        </div>


                    </div>

                    {/* Cards */}

                    <div className="dashboard-cards">

                        <div className="dash-card">

                            <div className="card-icon pink">

                                <FaDollarSign />

                            </div>

                            <h4>Earnings</h4>

                            <h2>$93,438.78</h2>

                            <p>Monthly Revenue</p>

                        </div>

                        <div className="dash-card">

                            <div className="card-icon yellow">

                                <FaShoppingBasket />

                            </div>

                            <h4>Orders</h4>

                            <h2>42,339</h2>

                            <p>35+ New Sales</p>

                        </div>

                        <div className="dash-card">

                            <div className="card-icon blue">

                                <FaUsers />

                            </div>

                            <h4>Customers</h4>

                            <h2>39,354</h2>

                            <p>30+ new in 2 days</p>

                        </div>

                    </div>

               




                <div className="dashboard-chart-section">

                    <div className="revenue-card">

                        <div className="chart-header">

                            <div>

                                <h2>Revenue</h2>

                                <p>(+63%) than last year</p>

                            </div>

                            <select>

                                <option>2020</option>

                                <option>2021</option>

                                <option>2022</option>

                            </select>

                        </div>

                        <Chart
                            options={revenue.options}
                            series={revenue.series}
                            type="area"
                            height={360}
                        />

                    </div>

                    <div className="sales-card">

                        <h2>Total Sales</h2>

                        <Chart
                            options={sales.options}
                            series={sales.series}
                            type="donut"
                            height={330}
                        />

                    </div>

                </div>

{/* dash footer---------------- */}
  <div className="dashboard-bottom">

      {/* Left */}

      <div className="sales-overview">

        <h2>Sales Overview</h2>

        <div className="progress-item">

          <div className="progress-header">
            <span>Total Profit</span>
            <span>$1,619 (8.6%)</span>
          </div>

          <div className="progress-bar">

            <div
              className="progress-fill green"
              style={{ width: "9%" }}
            ></div>

          </div>

        </div>

        <div className="progress-item">

          <div className="progress-header">
            <span>Total Income</span>
            <span>$3,571 (86.4%)</span>
          </div>

          <div className="progress-bar">

            <div
              className="progress-fill blue"
              style={{ width: "86%" }}
            ></div>

          </div>

        </div>

        <div className="progress-item">

          <div className="progress-header">
            <span>Total Expenses</span>
            <span>$3,430 (74.5%)</span>
          </div>

          <div className="progress-bar">

            <div
              className="progress-fill red"
              style={{ width: "75%" }}
            ></div>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="dashboard-info">

        <div className="info-card">

          <div className="info-icon yellow">

            <FaBell />

          </div>

          <div>

            <h3>Start your day with New Notification.</h3>

            <p>
              You have <span>2 new notification</span>
            </p>

          </div>

        </div>

        <div className="info-card">

          <div className="info-icon green">

            <FaLightbulb />

          </div>

          <div>

            <h3>Monitor your Sales and Profitability</h3>

            <p>
              You have <span>View Performance</span>
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