import React from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import classes from "./BCrumbs.module.css";

const BCrumbs = ({ parent, child }) => {
  const items = [
    { title: "Accueil", href: "/" },
    { title: `${parent}`, href: `/${parent}` },
    { title: `${child}` },
  ].map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      className={classes.li}
      style={{ fontSize: 14, color: "#324376" }}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Breadcrumbs className={classes.breadcrumbs}>{items}</Breadcrumbs>
    </>
  );
};

export default BCrumbs;
