import Joi from 'joi';

import {carRegexp} from "../regexpEnum";

const carValidator = Joi.object({
    brand: Joi.string().regex(carRegexp.brand).required().messages({
        'string.pattern.base': 'Only letters min 1 max 20'
    }),
    price: Joi.number().min(1000).max(1000000).required(),
    year: Joi.number().min(1965).max(new Date().getFullYear()).required(),
});

export {carValidator}