import * as Yup from "yup";

const militaryProfileSchema = Yup.object({
    monthlyIncome: Yup.number("Enter a number").typeError("Enter a number"),
    moveInDate: Yup.date().typeError("Must be a date in YYYY-MM-DD format"),
    isActiveDuty: Yup.bool().required("Required"),
    branchId: Yup.number().min(1, "Must make a selection").required("Required"),
    rankId: Yup.number().min(1, "Must make a selection").required("Required"),
    hasHousingAllowance: Yup.bool().required("Required"),
    unit: Yup.string(),
    noLaterThanDate: Yup.date().typeError("Must be a date in YYYY-MM-DD format"),
})

export {militaryProfileSchema}