export interface MenuOption {
  id: string;
  name: string;
  price: number;
  vegan?: boolean;
  spicy?: boolean;
}

export const bases: MenuOption[] = [
  {
    id: "rice",
    name: "Basmati Rice",
    price: 0,
  },
  {
    id: "greens",
    name: "Mixed Greens",
    price: 0,
  },
  {
    id: "pasta",
    name: "Pasta",
    price: 1,
  },
  {
  id: "no-base",
  name: "No Base",
  price: 0,
},
];

export const proteins: MenuOption[] = [
  {
    id: "chicken",
    name: "Chicken Tikka",
    price: 3,
  },
  {
    id: "paneer",
    name: "Paneer Tikka",
    price: 3,
  },
  {
    id: "chana",
    name: "Chana Masala",
    vegan: true,
    price: 2,
  },
  {
    id: "no-protein",
    name: "No Protein",
    price: 0,
  },
];

export const sauces: MenuOption[] = [
  {
    id: "mint",
    name: "Mint Chutney",
    price: 0,
  },
  {
    id: "tikka",
    name: "Tikka Sauce",
    price: 0,
  },
  {
    id: "vindaloo",
    name: "Vindaloo Sauce",
    spicy: true,
    price: 0,
  },
  {
    id: "chili",
    name: "Spicy Chili Garlic",
    spicy: true,
    price: 0,
  },
];

export const toppings = [
  "Amul Cheese",
  "Pickled Onions",
  "Cucumber",
  "Tomato",
  "Cabbage Slaw",
  "Roasted Chickpeas",
  "Cilantro",
  "Crispy Onions",
  "Mango Salsa",
];

export const signatureItems = [
  {
    id: "alfredo",
    name: "Chicken / Paneer Tikka Alfredo",
    image: "/images/alfredo.jpg",
    price: 14.99,

    description:
      "Creamy tikka alfredo pasta topped with fresh vegetables and chutney.",

    ingredients: [
      "Penne Pasta",
      "Chicken Tikka",
      "Paneer Tikka",
      "Tikka Sauce",
      "Mint Chutney",
      "Amul Cheese",
      "Cucumber Salad",
      "Pickled Onions",
    ],

    removable: [
      "Chicken Tikka",
      "Paneer Tikka",
      "Mint Chutney",
      "Amul Cheese",
      "Cucumber Salad",
      "Pickled Onions",
    ],

    addOns: [
      {
        id: "extra-chicken",
        name: "Extra Chicken",
        price: 3,
      },
      {
        id: "extra-paneer",
        name: "Extra Paneer",
        price: 3,
      },
      {
        id: "extra-cheese",
        name: "Extra Amul Cheese",
        price: 1.5,
      },
    ],
  },

  {
    id: "naanpizza",
    name: "Naan Pizza",
    image: "/images/pizza.jpg",
    price: 13.99,

    description:
      "Fresh naan topped with tikka sauce, cheese, and your choice of protein.",

    ingredients: [
      "Naan",
      "Chicken Tikka",
      "Paneer Tikka",
      "Tikka Sauce",
      "Amul Cheese",
    ],

    removable: [
      "Chicken Tikka",
      "Paneer Tikka",
      "Amul Cheese",
    ],

    addOns: [
      {
        id: "extra-chicken",
        name: "Extra Chicken",
        price: 3,
      },
      {
        id: "extra-paneer",
        name: "Extra Paneer",
        price: 3,
      },
      {
        id: "extra-cheese",
        name: "Extra Amul Cheese",
        price: 1.5,
      },
    ],
  },

  {
    id: "macbites",
    name: "Masala Mac & Cheese Bites",
    image: "/images/macbites.jpg",
    price: 7.99,

    description:
      "Golden fried mac and cheese bites seasoned with Indian spices.",

    ingredients: [
      "Mac & Cheese",
      "Masala Seasoning",
    ],

    removable: [],

    addOns: [
      {
        id: "extra-dip",
        name: "Extra Dipping Sauce",
        price: 1,
      },
    ],
  },
];