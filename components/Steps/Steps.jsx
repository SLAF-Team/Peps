import classes from "./Steps.module.css";

const Steps = ({ recipe, container, steps }) => {
  return (
    <div className={container}>
      {recipe?.steps &&
        recipe?.steps.map((element, index) => (
          <div key={index}>
            <p className={classes.steps}>Étape {index + 1}</p>
            <p>{element.text} </p>
          </div>
        ))}
    </div>
  );
};

export default Steps;
