import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Button from '../Button';

const DishCard = (props) => {
    const dish = props.dish;
    const token = Cookies.get('token');
    const router = useRouter();
    const formRef = useRef();



    return (
        <div>
            <h1>Titre : {dish.title}</h1>
            <p>Description : {dish.description}</p>
            <Button type={'primary'} label={"Plus de détail"} href={`/dishes/${dish.id}`}/>
        </div>
    );

};

export default DishCard;
