function generateData() {
  const data = [
    {
      id: 1,
      string: "Sample String 1",
      number: 100,
      date: "2023-09-13",
    },
  ];

  for (let i = 2; i <= 1000; i++) {
    const day = i <= 30 ? i : i % 30;
    const month = i <= 12 ? i : i % 12;
    const year = 2023;

    data.push({
      id: i,
      string: `Sample String ${i}`,
      number: i * Math.floor(Math.random() * 10),
      date: `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`,
    });
  }

  return data;
}

module.exports = {
  generateData,
};
