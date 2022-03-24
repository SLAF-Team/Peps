import Button from "../Button";

const DishCard = ({dish}) => {

return (
<div>
    <h1>Titre : {dish.title}</h1>
    <p>Description : {dish.description}</p>
    <Button
    type={"primary"}
    label={"Plus de détails"}
    href={`/dishes/${dish.id}`}
    />
</div>
);
};

export default DishCard;
