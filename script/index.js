document.addEventListener("DOMContentLoaded", function () {
  fetch("json/superstore.json")
    .then((response) => response.json())
    .then((data) => {
      const dailyProfit = {};
      const monthlyProfit = {};
      const yearlyProfit = {};

      data.forEach((entry) => {
        const date = new Date(entry["Order Date"]);
        const day = date.toISOString().split("T")[0];
        const month = date.toISOString().slice(0, 7);
        const year = date.getFullYear();

        if (!dailyProfit[day]) dailyProfit[day] = 0;
        if (!monthlyProfit[month]) monthlyProfit[month] = 0;
        if (!yearlyProfit[year]) yearlyProfit[year] = 0;

        dailyProfit[day] += entry.Profit;
        monthlyProfit[month] += entry.Profit;
        yearlyProfit[year] += entry.Profit;
      });

      const dailyLabels = Object.keys(dailyProfit).sort();
      const dailyData = dailyLabels.map((day) => dailyProfit[day]);

      const monthlyLabels = Object.keys(monthlyProfit).sort();
      const monthlyData = monthlyLabels.map((month) => monthlyProfit[month]);

      const yearlyLabels = Object.keys(yearlyProfit).sort();
      const yearlyData = yearlyLabels.map((year) => yearlyProfit[year]);

      const ctx = document.getElementById("myChart").getContext("2d");

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dailyLabels,
          datasets: [
            {
              label: "Daily Profit",
              data: dailyData,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      document
        .querySelectorAll(".statistic-card-link")
        .forEach(function (link) {
          link.addEventListener("click", function () {
            const type = this.getAttribute("data-type");

            let labels, data, label;
            if (type === "daily") {
              labels = dailyLabels;
              data = dailyData;
              label = "Daily Profit";
            } else if (type === "monthly") {
              labels = monthlyLabels;
              data = monthlyData;
              label = "Monthly Profit";
            } else if (type === "yearly") {
              labels = yearlyLabels;
              data = yearlyData;
              label = "Yearly Profit";
            }

            myChart.data.labels = labels;
            myChart.data.datasets[0].data = data;
            myChart.data.datasets[0].label = label;
            myChart.update();
          });
        });
    })
    .catch((error) => console.error("Error fetching the JSON data:", error));
});
