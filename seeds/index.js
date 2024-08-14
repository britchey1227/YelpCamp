const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const randPrice = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '66b155605b7dcaa00bce0346',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/doksdvdsr/image/upload/v1723067688/YelpCamp/ptolts3nanzsako4bxxt.jpg',
          filename: 'YelpCamp/ptolts3nanzsako4bxxt',
        },
        {
          url: 'https://res.cloudinary.com/doksdvdsr/image/upload/v1723067688/YelpCamp/ku3amn6tqa8k1b4vt1o5.jpg',
          filename: 'YelpCamp/ku3amn6tqa8k1b4vt1o5',
        },
        {
          url: 'https://res.cloudinary.com/doksdvdsr/image/upload/v1723067689/YelpCamp/ycogmgslmdmsyohinygj.jpg',
          filename: 'YelpCamp/ycogmgslmdmsyohinygj',
        }
      ],
      description: "this is our description",
      price: randPrice,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
    });
    await camp.save();
  }
  console.log("Database seeded");
};

seedDB().then(() => {
  mongoose.connection.close();
});
