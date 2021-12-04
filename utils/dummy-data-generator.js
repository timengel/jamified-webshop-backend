'use strict';

const LoremIpsum = require('lorem-ipsum').LoremIpsum;

//################## Helpers ##################\\
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 3,
    min: 1
  },
  wordsPerSentence: {
    max: 12,
    min: 5
  }
});

const generateRandomNumber = (min, max, precision) => {
  // Including min number, excluding max number!
  return Math.floor(Math.random() * (max * precision - min * precision) + min * precision) / (min * precision)
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getRandomCategories = () => {
  // How many categories to assign to product
  const numberOfCategories = generateRandomInteger(1, 3); // 1, 3 => 2 categories
  // Generate unique category indexes
  const indexes = [];
  const categories = getCategories();
  while(indexes.length < numberOfCategories){
    let category = generateRandomInteger(1, categories.length);
    if(indexes.indexOf(category) === -1) indexes.push(category);
  }
  // Return category objects by index
  const result = [];
  indexes.map(i => {
      result.push(categories[i]);
  });
  return result;
}

const generateProduct = ({id, title, description, price, slug, categories}) => {
  return {
    id: id,
    title: title,
    description: description,
    price: price,
    slug: slug,
    status: 'published',
    Custom_field: [
      {
        id: id,
        title: 'Select the size of your sticker',
        required: true,
        options: 'Small[+0.00]|Medium[+0.40]|Large[+0.80]',
      },
    ],
    image: null,
    categories: categories,
  }
};

//################## Exported Utils ##################\\
const generateRandomInteger =  (min, max) => parseInt(generateRandomNumber(min, max, 10))

const getCategories = () => {
  return [
    {
      name: "Back",
      slug: "back",
    },
    {
      name: "Front",
      slug: "front",
    },
    {
      name: "SSG",
      slug: "ssg",
    },
    {
      name: "Container",
      slug: "container",
    },
    {
      name: "Database",
      slug: "database",
    },
    {
      name: "Other",
      slug: "other",
    },
  ];
}

const getProducts = () => {
  let products = [];
  for (let i = 1; i < 100; i++) {
    const name = lorem.generateWords(1);
    const title = capitalizeFirstLetter(name);
    const slug = name + '-' + i.toString();

    products.push(generateProduct({
        id: i,
        title: title,
        description: lorem.generateSentences(1),
        price: generateRandomNumber(1, 1000, 100), // precision 100 => 2 decimal places
        slug: slug,
        categories: getRandomCategories(),
      }
    ))
  }
  return products;
}

module.exports = {
  generateRandomInteger: generateRandomInteger,
  getProducts: getProducts,
  getCategories: getCategories,
}
