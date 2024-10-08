import { selectTeacherById } from './../../store/selector';
import { useAppDispatch, useAppSelector } from "@/app/store"
import { getSubjectsList } from "@/features/Subjects/store/actions"
import { selectSubjects } from "@/features/Subjects/store/selector"
import { validator } from "@/shared/libs"
import { useEffect } from "react"
import * as yup from "yup"
import { editTeacher } from "../../store/actions"
import { TeacherCreate } from "../../type"

const editService = (teacherId: number, onClose: () => void) => {
    const dispatch = useAppDispatch()
    const { data: subjects } = useAppSelector(selectSubjects)
    const { data: teacher } = useAppSelector(selectTeacherById)
    const validationSchema = yup.object().shape({
        full_name: yup.string().required("Обязательное поле"),
        date_birth: yup.string().required("Обязательное поле"),
        address: yup.string().required("Обязательное поле"),
        predmet: yup.string().required("Обязательное поле"),
        work_list: yup.array().of(
            yup.object().shape({
                place_of_work: yup.string().required("Обязательное поле")
            })
        ),
        education_list: yup.array().of(
            yup.object().shape({
                place_of_study: yup.string().required("Обязательное поле")
            })
        ),
        inn: yup
            .string()
            .required("Обязательное поле")
            .test("Неправильный формат ИНН", "Неправильный формат ИНН", (value) =>
                validator.innChecker(value)
            ),
    })
    const initialValues: TeacherCreate = {
        full_name: teacher.full_name || "",
        inn: teacher.inn || "",
        address: teacher.address || "",
        comment: teacher.comment || "",
        date_birth: teacher.date_birth || "",
        predmet: subjects.find((item) => item.predmet == teacher.predmet)?.id.toString() || "",
        education_list: teacher.place_of_study?.map(place => {
            return {
                place_of_study: place.mestoucheby
            };
        }) || [],
        work_list: teacher.place_of_works?.map(place => {
            return {
                place_of_work: place.mestoraboty
            };
        }) || [],
        staj: teacher.staj || "",
        phone: teacher.phone || "",
        optional_phone_list: teacher.phone_numbers || [],
        user_type: 3
    }
    const onSubmit = (values: TeacherCreate) => {
        dispatch(editTeacher({ id: teacherId, req: values, onClose }))
    }
    useEffect(() => {
        dispatch(getSubjectsList())
    }, [])
    return { initialValues, validationSchema, onSubmit, subjects }
}

export default editService
