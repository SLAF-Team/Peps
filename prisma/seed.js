const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.ingredient.deleteMany({});
  await prisma.type.deleteMany({});
  await prisma.region.deleteMany({});
  await prisma.country.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.dish.deleteMany({});
  await prisma.recipe.deleteMany({});
  await prisma.user.deleteMany({});

  const john = await prisma.user.create({
    data: {
      name: "john",
      email: "john.doe@yopmail.com",
      isadmin: true,
      password: "johndoe",
    },
  });

  const countries = [
    { name: "France" },
    { name: "Italie" },
    { name: "Espagne" },
  ];

  const regions = [
    { name: "Asie" },
    { name: "Méditerrannée" },
    { name: "Amérique du Sud" },
  ];

  const tags = [
    { name: "Végétarien" },
    { name: "Sans gluten" },
    { name: "coucou" },
  ];

  const types = [{ name: "Entrée" }, { name: "Plat" }, { name: "Dessert" }];

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

  const dishs = [
    {
      title: "Couscous",
      description:
        "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source  in the world.",
    },
    {
      title: "Pot au Feu à l'ancienne",
      description:
        "Over the past two decades, Rails has taken countless companies to millions of users and billions in market valuations.",
    },
    {
      title: "Poutin",
      description: "Sans commentaire.",
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

    await prisma.dish.createMany({
      data: dishs,
    });

  await prisma.recipe.createMany({
    data: recipes,
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
