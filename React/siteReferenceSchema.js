import * as Yup from 'yup';

const siteReferenceSchema = Yup.object().shape({
    reference: Yup.string().required('Is Required'),
});

export { siteReferenceSchema };
