export const chartData = (productPrices, labels, barThickness) => {
  return {
    labels,
    datasets: [
      {
        label: "Toplam",
        data: productPrices,
        backgroundColor: "#D9D9D9",
        borderRadius: 8,
        barThickness: barThickness,
        datalabels: {
          align: "end",
          anchor: "end",
          color: "#349590",
          font: {
            weight: "600", // Kalın font ekleyin
          },
          formatter: (value) => value.toFixed(2) + " TL",
        },
      },
    ],
  };
};

export const chartOptions = {
  layout: {
    padding: {
      top: 20,
    },
  },
  scaleShowLabels: false,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: false,
      beginAtZero: true,
      ticks: {
        display: true,
        color: "red",
      },
      grid: {
        display: false,
      },
    },
    x: {
      ticks: {
        color: "#349590",
      },
      grid: {
        display: false,
        color: "green",
      },
      barPercentage: 0.8, // Bar genişliği yüzde olarak (0.8 örnek bir değer, deneyerek ayarlayabilirsiniz)
      categoryPercentage: 0.9,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    anchor: "start",
  },
};

export const getproductPricesByCategory = (categoryNames, basketItems) => {
  const productPrices = Array(categoryNames.length).fill(0);
  basketItems.forEach((item) => {
    const categoryIndex = categoryNames.indexOf(item.product.category);
    if (categoryIndex !== -1) {
      productPrices[categoryIndex] += item.quantity * item.product.price;
    }
  });
  return productPrices;
};
