// import React, { useState, useEffect } from "react";
// import {
//   PieChart,
//   Pie,
//   LineChart,
//   Line,
//   Tooltip,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import { supabase } from "../utils/supabase";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [tasksData, setTasksData] = useState([]);
//   const [tasksTrendData, setTasksTrendData] = useState([]);

//   useEffect(() => {
//     fetchTasksData();
//     fetchTasksTrendData();
//   }, []);

//   const fetchTasksData = async () => {
//     try {
//       let { data: tasksData, error } = await supabase
//         .from("tasks")
//         .select("is_done");
//       if (error) throw error;
//       const numTasks = tasksData.length;
//       const numDoneTasks = tasksData.filter((task) => task.is_done).length;
//       const formattedData = [
//         { name: "Tasks", tasks: numTasks },
//         { name: "Done", value: numDoneTasks },
//         { name: "Not Done", value: numTasks - numDoneTasks },
//       ];
//       setTasksData(formattedData);
//     } catch (error) {
//       console.error("Error fetching tasks data:", error.message);
//     }
//   };

//   const fetchTasksTrendData = async () => {
//     try {
//       let { data: tasksTrendData, error } = await supabase
//         .from("tasks")
//         .select("created_at");
//       if (error) throw error;
//       const tasksAddedByDate = aggregateTasksByDate(tasksTrendData);
//       setTasksTrendData(tasksAddedByDate);
//     } catch (error) {
//       console.error("Error fetching tasks trend data:", error.message);
//     }
//   };

//   const aggregateTasksByDate = (tasksData) => {
//     const tasksByDate = {};
//     tasksData.forEach((task) => {
//       const date = new Date(task.created_at).toLocaleDateString();
//       if (!tasksByDate[date]) {
//         tasksByDate[date] = 1;
//       } else {
//         tasksByDate[date]++;
//       }
//     });
//     return Object.keys(tasksByDate).map((date) => ({
//       date,
//       tasks: tasksByDate[date],
//     }));
//   };

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-heading">Dashboard Page</h1>
//       <div className="chart-container">
//         <div className="chart-wrapper">
//           <h2 className="chart-title">Tasks Status</h2>
//           <PieChart width={300} height={200}>
//             <Pie
//               dataKey="value"
//               data={tasksData.filter((task) => task.value > 0)}
//               fill="#8884d8"
//               label
//             />
//             <Tooltip />
//           </PieChart>
//         </div>
//       </div>
//       <div className="chart-wrapper">
//         <h2 className="chart-title">Tasks Added Trend</h2>
//         <LineChart width={1100} height={300} data={tasksTrendData}>
//           <XAxis dataKey="date" />
//           <YAxis />
//           <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//           <Tooltip />
//           <Line type="monotone" dataKey="tasks" stroke="#8884d8" />
//         </LineChart>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
