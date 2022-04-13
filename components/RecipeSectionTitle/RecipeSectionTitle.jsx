import React from "react";
import classes from './RecipeSectionTitle.module.css'

const RecipeSectionTitle = ({children}) => {
  return (
    <div className={classes.selector}>
      <div className="selectorBlock">
        <p className={classes.selectorText}>{children}</p>
      </div>
    </div>
  );
};

export default RecipeSectionTitle;
