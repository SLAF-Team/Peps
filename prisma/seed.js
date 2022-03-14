const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.deleteMany({});
  await prisma.user.deleteMany({});

  const john = await prisma.user.create({
    data: {
      name: "john",
      email: "john.doe@yopmail.com",
      iscook: true,
      isadmin: true,
      password: "johndoe",
    },
  });

  const users = [
    {
      name: "Owner1234",
      email: "owner1234@yopmail.com",
      iscook: true,
      password: "123456",
    },
    {
      name: "Owner2345",
      email: "owner2345@yopmail.com",
      iscook: false,
      password: "123456",
    },
    {
      name: "Owner3456",
      email: "owner3456@yopmail.com",
      iscook: false,
      password: "123456",
    },
  ];

  const recipes = [
    {
      title: "Couscous",
      description:
        "pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source  in the world.",
      imageUrl:
        "https://img.cuisineaz.com/660x660/2017/02/06/i120514-couscous-au-lait.jpeg",
      published: true,
      cookId: john.id,
    },
    {
      title: "Pot au Feu à l'ancienne",
      description:
        "Over the past two decades, Rails has taken countless companies to millions of users and billions in market valuations.",
      imageUrl:
        "https://resize-parismatch.lanmedia.fr/img/var/news/storage/images/paris-match/culture/medias/la-cuisine-des-mousquetaires-micheline-banzet-acolyte-de-maite-est-morte-1700201/27713466-1-fre-FR/La-Cuisine-des-Mousquetaires-Micheline-Banzet-acolyte-de-Maite-est-morte.jpg",
      published: true,
      cookId: john.id,
    },
    {
      title: "Poutin",
      description: "Sans commentaire.",
      imageUrl: "https://www.ledevoir.com/documents/image/vladimir-poutine.jpg",
      published: true,
      cookId: john.id,
    },
  ];

  https: await prisma.user.createMany({
    data: users,
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
