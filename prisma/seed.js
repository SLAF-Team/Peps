const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.deleteMany({});
  await prisma.dish.deleteMany({});
  await prisma.ingredient.deleteMany({});
  await prisma.type.deleteMany({});
  await prisma.country.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.region.deleteMany({});
  await prisma.unit.deleteMany({});

  const john = await prisma.user.create({
    data: {
      name: "john",
      email: "john.doe@yopmail.com",
      isadmin: true,
      password: "johndoe",
    },
  });

  const afrique = await prisma.region.create({
    data: {
      name: "Afrique",
    },
  });

  const maroc = await prisma.country.create({
    data: { name: "Maroc" },
  });

  const countries = [
    { name: "France" },
    { name: "Italie" },
    { name: "Espagne" },
  ];

  const regions = [
    { name: "Asie" },
    { name: "Europe du Sud" },
    { name: "Amérique du Sud" },
  ];

  const tags = [
    { name: "Végétarien" },
    { name: "Sans gluten" },
    { name: "coucou" },
  ];

  const ingredients = [
    { name: "Sucre" },
    { name: "Eau" },
    { name: "Courgette" },
  ];

    const tag = await prisma.type.create({
      data: { name: "Carnivore" },
    });

  const entree = await prisma.type.create({
    data: { name: "Entrée" },
  });

  const types = [{ name: "Plat" }, { name: "Dessert" }];

  const users = [
    {
      name: "Owner1234",
      email: "owner1234@yopmail.com",
      password: "123456",
    },
    {
      name: "Owner2345",
      email: "owner2345@yopmail.com",
      password: "123456",
    },
    {
      name: "Owner3456",
      email: "owner3456@yopmail.com",
      password: "123456",
    },
  ];

  const gramme = await prisma.unit.create({
    data: { name: "gr" },
  });

  const units = [
    {
      name: "L",
    },
    {
      name: "Cl",
    },
    {
      name: "cuillère à soupe",
    },
    {
      name: "cuillère à café",
    },
    {
      name: "unité",
    },
  ];

  const couscous = await prisma.dish.create({
    data: {
      title: "Couscous",
      imageUrl:
        "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
      description:
        "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source  in the world.",
      regionId: afrique.id,
    },
  });

  const dishes = [
    {
      title: "Pot au Feu à l'ancienne",
      imageUrl:
        "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
      description:
        "Over the past two decades, Rails has taken countless companies to millions of users and billions in market valuations.",
      regionId: afrique.id,
    },
    {
      title: "Poutine",
      imageUrl:
        "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
      description: "Sans commentaire.",
      regionId: afrique.id,
    },
  ];

  const recipe = await prisma.recipe.create({
    data: {
      name: "Couscous en mode blanquette",
      imageUrl:
        "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
      description:
        "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source  in the world.",
      cookId: john.id,
      dishId: couscous.id,
      typeId: entree.id,
      countryId: maroc.id,
    },
  });

  const list = await prisma.list.create({
    data: {
      name: "À essayer",
      userId: john.id,
      recipes: {
        connect: [{ id: recipe.id }],
      },
    },
  });

  const recipes = [
    {
      name: "Couscous de chez ma grand mère",
      imageUrl:
        "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
      description:
        "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source  in the world.",
      cookId: john.id,
      dishId: couscous.id,
      typeId: entree.id,
      countryId: maroc.id,
    },
    {
      name: "Un autre couscous incroyable",
      imageUrl:
        "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
      description:
        "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source  in the world.",
      cookId: john.id,
      dishId: couscous.id,
      typeId: entree.id,
      countryId: maroc.id,
    },
  ];

    const comments = [
      {
        text: "Testé et approuvé !",
        userId: john.id,
        recipeId: recipe.id,
      },
      {
        text: "En fait j'ai détesté !",
        userId: john.id,
        recipeId: recipe.id,
      },
    ];

  https: await prisma.user.createMany({
    data: users,
  });

  await prisma.tag.createMany({
    data: tags,
  });

  await prisma.country.createMany({
    data: countries,
  });

  await prisma.type.createMany({
    data: types,
  });

  await prisma.region.createMany({
    data: regions,
  });

  await prisma.ingredient.createMany({
    data: ingredients,
  });

  await prisma.dish.createMany({
    data: dishes,
  });

  await prisma.recipe.createMany({
    data: recipes,
  });

  await prisma.unit.createMany({
    data: units,
  });

  await prisma.comment.createMany({
    data: comments,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
