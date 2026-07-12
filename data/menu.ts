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
    description:
      "Penne pasta with tikka sauce, cucumber salad, pickled onions, mint chutney, and Amul cheese.",
    image: "/images/alfredo.jpg",
    price: 14.99,
  },
  {
    id: "naanpizza",
    name: "Naan Pizza",
    description:
      "Naan bread with tikka sauce, Amul cheese, and grilled chicken or paneer.",
    image: "/images/pizza.jpg",
    price: 13.99,
  },
  {
    id: "macbites",
    name: "Masala Mac & Cheese Bites",
    description:
      "Golden fried mac and cheese bites with Indian spices.",
    image: "/images/macbites.jpg",
    price: 7.99,
  },
];