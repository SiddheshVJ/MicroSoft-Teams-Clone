import { Schema, Types } from "mongoose";

export const validateMongoDbId = (id => {
    const isValid = Types.ObjectId.isValid(id)

    if (!isValid) throw new Error(' This is not valid or not found')
})