import Joi, { string } from 'joi'


export interface Login {
    email: string,
    password: string
}

export interface Group {
    groupName: string;
    groupDescription: string;
    groupImage: string;
    groupImageId: string;
    groupAdmin: string[];
}
export const validateLogin = (data: Login) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

export const validateCreateGroup = (info: Group) => {
    const schema = Joi.object({
        groupName: Joi.string().required(),
        groupDescription: Joi.string().required(),
        groupImage: Joi.string().required(),
        groupImageId: Joi.string().required(),
    })
    return schema.validate(info)
}

