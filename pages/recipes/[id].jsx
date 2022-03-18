import prisma from "../../lib/prisma.ts";

const SelectedRecipe = ({ recipe }) => {
  return <h1>{recipe.name}</h1>;
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(id) },
  });
  return {
    props: {
      recipe,
    },
  };
}

export default SelectedRecipe;
