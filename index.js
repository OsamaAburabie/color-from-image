const getColors = require("get-image-colors");

const data = [
  {
    name: "house",
    Image:
      "https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg",
  },
  {
    name: "yard",
    Image:
      "https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2017/07/level-yard.jpg",
  },
];
const getColor = async (data) => {
  const dataWithColor = await Promise.allSettled(
    data.map(async (item) => {
      const colors = await getColors(item.Image);
      const hexColors = colors.map((color) => color.hex());
      return {
        ...item,
        colors: hexColors,
      };
    })
  );
  return dataWithColor
    .filter((item) => item.status === "fulfilled")
    .map((item) => {
      const { value } = item;
      return { ...value };
    });
};

const printColor = async () => {
  const res = await getColor(data);
  console.log(res);
};

printColor();
