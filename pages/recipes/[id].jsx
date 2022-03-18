import prisma from "../../lib/prisma.ts";

const SelectedRecipe = ({ recipe }) => {
  return (
    <div style={{ margin:"20px"}}>
        <img src={recipe.imageUrl} style={{ width:"200px"}}/>
        <h1>{recipe.name}</h1>
        <h2>Une variante de NOMDUPLAT{recipe.dish}</h2>
        <p>Description: {recipe.description}</p>
        <p>Etapes: {recipe.steps}</p>

    </div>
  )
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
