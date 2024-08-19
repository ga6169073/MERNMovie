import * as yup from 'yup';

const ReviewValidation = yup.object().shape({
    comment: yup.string().required("Comment is required")
        .max(200, "Comment must be less than 200 characters"),
    rating: yup.number().required("Select a rating")
})

const movieValidation = yup.object().shape({
    name: yup.string().required("Movie name is required")
        .max(50, "Movie name must be less than 50 characters"),
    time: yup.number().required("Movie duration is required")
    .transform((value) => Number.isNaN(value) ? null : value ),
    language: yup.string().required("Movie language is required"),
    year: yup.number().required("Movie released year is required")
    .transform((value) => Number.isNaN(value) ? null : value ),
    category: yup.string().required("Movie category is required"),
    desc: yup.string().required("Movie description is required")
        .max(300, "Movie description must be less than 300 characters"),
})

const castValidation = yup.object().shape({
    name: yup.string().required("Cast name is required")
        .max(50, "Cast name must be less than 50 characters"),
})
export { ReviewValidation, movieValidation, castValidation };