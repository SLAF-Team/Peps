// import prisma from "../../../../lib/prisma.ts";
// import { checkAuth, checkIfAuthor } from "../../../../lib/auth";

// export default async (req, res) => {
//   console.log("REQUETE")
//   console.log(req)
//   const { id } = req.query;
//   console.log(id)

//   // const isAuth = await checkAuth(req);
//   // if (!isAuth) {
//   //   res.status(403).json({ err: "Forbidden" });
//   //   return;
//   // }

//   //   const isAuthor = await checkIfAuthor(req, list, id);
//   //   if (!isAuthor) {
//   //     res.status(403).json({ err: "Forbidden" });
//   //     return;
//   //   }

//   try {
//     const deleteList = await prisma.list.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });
//     res.status(200).json(deleteList);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(400)
//       .json({ err: "Error occured while deleting a list item." });
//   }
// };

import prisma from "../../../../lib/prisma.ts";
import { checkAuth } from "../../../../lib/auth";

export default async (req, res) => {
  const isAuth = await checkAuth(req);
  if (!isAuth) {
    res.status(403).json({ err: "Forbidden" });
    return;
  }

  const { id } = req.query;

  try {
    const deleteComment = await prisma.list.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(deleteComment);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ err: "Error occured while deleting a Recipe item." });
  }
};

