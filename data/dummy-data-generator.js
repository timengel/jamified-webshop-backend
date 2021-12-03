'use strict';

const fs = require('fs');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;



// lorem.generateWords(1);
// lorem.generateSentences(5);
// lorem.generateParagraphs(7);

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

const generateRandomInteger =  (min, max) => parseInt(generateRandomNumber(min, max, 10))


const getRandomCategories = () => {
  const categories = [
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
  // How many categories to add
  const numberOfCategories = generateRandomInteger(1, 3); // 1, 3 => 2 categories
  // Generate unique category indexes
  const indexes = [];
  // console.log('#########################');
  // console.log('numberOfCategories: ' + numberOfCategories);
  while(indexes.length < numberOfCategories){
    let category = generateRandomInteger(1, 6);
    // console.log('category: ' + category);
    if(indexes.indexOf(category) === -1) indexes.push(category);
  }
  // Return category objects by index
  const result = [];
  indexes.map(i => {
      result.push(categories[i]);
  });
  // console.log('indexes: ' + indexes);
  // console.log('result: ');
  // result.map(r => console.log(r.name));
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

let products = [];
for (let i = 28; i < 50; i++) {
  const title = lorem.generateWords(1);
  const slug = title + '-' + i.toString();

  products.push(generateProduct({
      id: i,
      title: lorem.generateWords(1),
      description: lorem.generateSentences(1),
      price: generateRandomNumber(1, 1000, 100), // precision 100 => 2 decimal places
      slug: slug,
      categories: getRandomCategories(),
    }
  ))
}

let data = JSON.stringify(products);
fs.writeFileSync('dummy-products.json', data);
